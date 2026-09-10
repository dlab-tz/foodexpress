const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

router.post("/", async (req, res) => {
  try {
    const { restaurant_id, customer_id, cart_items } = req.body;

    // Check required data
    if (
      !restaurant_id ||
      !customer_id ||
      !Array.isArray(cart_items) ||
      cart_items.length === 0
    ) {
      return res.status(400).json({
        error: "restaurant_id, customer_id and cart_items are required",
      });
    }

    // Validate cart items
    for (const item of cart_items) {
      if (
        !item.menu_item_id ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) <= 0
      ) {
        return res.status(400).json({
          error:
            "Each cart item must have a valid menu_item_id and positive quantity",
        });
      }
    }

    // Get the menu items belonging to the selected restaurant
    const menuItemIds = cart_items.map((item) => item.menu_item_id);

    const { data: menuItems, error: menuError } = await supabase
      .from("MenuItems")
      .select("id, price, restaurant_id")
      .in("id", menuItemIds)
      .eq("restaurant_id", restaurant_id);

    if (menuError) {
      return res.status(500).json({ error: menuError.message });
    }

    // Make sure all requested menu items exist
    const menuItemMap = new Map(
      menuItems.map((item) => [Number(item.id), item])
    );

    for (const cartItem of cart_items) {
      if (!menuItemMap.has(Number(cartItem.menu_item_id))) {
        return res.status(400).json({
          error:
            "One or more menu items were not found for this restaurant",
        });
      }
    }

    // Calculate total amount
    let totalAmount = 0;

    const orderItems = cart_items.map((cartItem) => {
      const menuItem = menuItemMap.get(Number(cartItem.menu_item_id));
      const quantity = Number(cartItem.quantity);
      const price = Number(menuItem.price);

      totalAmount += price * quantity;

      return {
        menu_item_id: cartItem.menu_item_id,
        quantity,
        price_at_order: price,
      };
    });

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_id,
          restaurant_id,
          total_amount: totalAmount,
        },
      ])
      .select()
      .single();

    if (orderError) {
      return res.status(500).json({ error: orderError.message });
    }

    // Add the order items
    const orderItemsWithOrderId = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    const { data: createdItems, error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsWithOrderId)
      .select();

    if (itemsError) {
      return res.status(500).json({ error: itemsError.message });
    }

    res.status(201).json({
      message: "Order created successfully",
      order,
      order_items: createdItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
