const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Get all restaurants
app.get('/restaurants', async (req, res) => {
  const { data, error } = await supabase.from('Restaurants').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get single restaurant details
app.get('/restaurants/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('Restaurants')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// --- NEW ORDER ROUTES START HERE ---

// Create order and calculate total server-side
app.post('/orders', async (req, res) => {
  const { restaurant_id, cart_items } = req.body;

  if (!restaurant_id || !cart_items || !Array.isArray(cart_items) || cart_items.length === 0) {
    return res.status(400).json({ error: 'restaurant_id and a non-empty cart_items array are required.' });
  }

  try {
    const menuItemIds = cart_items.map(item => item.menu_item_id);

    const { data: dbMenuItems, error: fetchError } = await supabase
      .from('MenuItems')
      .select('id, price')
      .in('id', menuItemIds);

    if (fetchError || !dbMenuItems) {
      return res.status(500).json({ error: 'Failed to retrieve menu item prices.' });
    }

    if (dbMenuItems.length !== menuItemIds.length) {
      return res.status(400).json({ error: 'One or more invalid menu_item_ids provided.' });
    }

    const priceMap = new Map(dbMenuItems.map(item => [item.id, Number(item.price)]));

    let calculatedTotal = 0;
    const preparedOrderItems = [];

    for (const item of cart_items) {
      if (!item.quantity || item.quantity <= 0) {
        return res.status(400).json({ error: 'Invalid item quantity.' });
      }

      const itemPrice = priceMap.get(item.menu_item_id);
      calculatedTotal += itemPrice * item.quantity;

      preparedOrderItems.push({
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price_at_order: itemPrice
      });
    }

    const { data: createdOrder, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          restaurant_id,
          total_amount: calculatedTotal,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (orderError) {
      return res.status(500).json({ error: 'Failed to create order record.' });
    }

    const orderItemsToInsert = preparedOrderItems.map(item => ({
      order_id: createdOrder.id,
      ...item
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert);

    if (itemsError) {
      return res.status(500).json({ error: 'Failed to insert order items.' });
    }

    return res.status(201).json({
      message: 'Order created successfully',
      order: createdOrder
    });

  } catch (err) {
    return res.status(500).json({ error: 'Server error creating order.' });
  }
});

// Fetch single order details for confirmation page
app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          price_at_order,
          MenuItems (
            name,
            description
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error || !order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    return res.json(order);
  } catch (err) {
    return res.status(500).json({ error: 'Server error fetching order details.' });
  }
});

// --- NEW ORDER ROUTES END HERE ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});