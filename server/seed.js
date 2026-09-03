require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const restaurants = [
  {
    name: "Munchy Restaurant",
    description: "A local restaurant serving delicious meals",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    cuisine_type: "International",
    rating: 4.5,
  },
  {
    name: "Spice Garden",
    description: "Fresh and flavorful meals with a variety of spices",
    image_url:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
    cuisine_type: "Indian",
    rating: 4.3,
  },
  {
    name: "Ocean Breeze",
    description: "Delicious seafood and coastal-inspired dishes",
    image_url:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    cuisine_type: "Seafood",
    rating: 4.6,
  },
  {
    name: "Urban Bites",
    description: "Quick and tasty meals for everyone",
    image_url:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    cuisine_type: "Fast Food",
    rating: 4.2,
  },
];

const menuItems = [
  {
    name: "Chicken Burger",
    description: "Grilled chicken burger with fresh vegetables",
    price: 8000,
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    category: "Burger",
  },
  {
    name: "Beef Burger",
    description: "Juicy beef burger with cheese and vegetables",
    price: 9000,
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    category: "Burger",
  },
  {
    name: "Pepperoni Pizza",
    description: "Classic pizza topped with pepperoni and cheese",
    price: 15000,
    image_url:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e",
    category: "Pizza",
  },
  {
    name: "French Fries",
    description: "Crispy golden french fries",
    price: 5000,
    image_url:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
    category: "Sides",
  },
  {
    name: "Chicken Pasta",
    description: "Creamy pasta served with grilled chicken",
    price: 12000,
    image_url:
      "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0",
    category: "Pasta",
  },
  {
    name: "Fresh Juice",
    description: "Freshly prepared seasonal fruit juice",
    price: 4000,
    image_url:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
    category: "Drinks",
  },
];

async function seedDatabase() {
  try {
    // Clear existing data
    const { error: menuDeleteError } = await supabase
      .from("menu_items")
      .delete()
      .neq("id", 0);

    if (menuDeleteError) {
      throw menuDeleteError;
    }

    const { error: restaurantDeleteError } = await supabase
      .from("restaurants")
      .delete()
      .neq("id", 0);

    if (restaurantDeleteError) {
      throw restaurantDeleteError;
    }

    // Insert restaurants
    const { data: savedRestaurants, error: restaurantError } =
      await supabase
        .from("restaurants")
        .insert(restaurants)
        .select();

    if (restaurantError) {
      throw restaurantError;
    }

    console.log(`Restaurants seeded: ${savedRestaurants.length}`);

    // Create menu items for every restaurant
    const allMenuItems = [];

    for (const restaurant of savedRestaurants) {
      for (const item of menuItems) {
        allMenuItems.push({
          ...item,
          restaurant_id: restaurant.id,
        });
      }
    }

    // Insert menu items
    const { data: savedMenuItems, error: menuError } = await supabase
      .from("menu_items")
      .insert(allMenuItems)
      .select();

    if (menuError) {
      throw menuError;
    }

    console.log(`Menu items seeded: ${savedMenuItems.length}`);
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Database seeding failed:", error.message);
  }
}

seedDatabase();