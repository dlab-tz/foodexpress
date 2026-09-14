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

const menuItemsByRestaurant = {
  "Munchy Restaurant": [
    {
      name: "Chicken Burger",
      description: "Grilled chicken burger with fresh vegetables",
      price: 8000,
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
      name: "Chicken Pasta",
      description: "Creamy pasta served with grilled chicken",
      price: 12000,
      image_url:
        "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0",
      category: "Pasta",
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
      name: "Fresh Juice",
      description: "Freshly prepared seasonal fruit juice",
      price: 4000,
      image_url:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      category: "Drinks",
    },
  ],

  "Spice Garden": [
    {
      name: "Chicken Biryani",
      description: "Fragrant basmati rice cooked with spiced chicken",
      price: 12000,
      image_url:
        "https://images.unsplash.com/photo-1563379091339-03246963d96c",
      category: "Rice",
    },
    {
      name: "Butter Chicken",
      description: "Tender chicken cooked in a rich creamy tomato sauce",
      price: 14000,
      image_url:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      category: "Curry",
    },
    {
      name: "Chicken Tikka",
      description: "Grilled chicken pieces marinated in Indian spices",
      price: 13000,
      image_url:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
      category: "Grill",
    },
    {
      name: "Samosa",
      description: "Crispy pastry filled with spiced potatoes and vegetables",
      price: 3000,
      image_url:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      category: "Snacks",
    },
    {
      name: "Garlic Naan",
      description: "Soft Indian flatbread topped with garlic and herbs",
      price: 4000,
      image_url:
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7",
      category: "Bread",
    },
  ],

  "Ocean Breeze": [
    {
      name: "Grilled Prawns",
      description: "Fresh prawns grilled with herbs and lemon",
      price: 18000,
      image_url:
        "https://images.unsplash.com/photo-1559737558-2f5a35f4523b",
      category: "Seafood",
    },
    {
      name: "Fish & Chips",
      description: "Crispy fried fish served with golden fries",
      price: 15000,
      image_url:
        "https://images.unsplash.com/photo-1579208030886-b937da0925dc",
      category: "Seafood",
    },
    {
      name: "Seafood Pasta",
      description: "Pasta tossed with prawns, calamari and fresh seafood",
      price: 18000,
      image_url:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
      category: "Pasta",
    },
    {
      name: "Calamari",
      description: "Crispy calamari rings served with a fresh dipping sauce",
      price: 14000,
      image_url:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
      category: "Seafood",
    },
    {
      name: "Grilled Fish",
      description: "Fresh coastal fish grilled with herbs and lemon",
      price: 16000,
      image_url:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      category: "Seafood",
    },
  ],

  "Urban Bites": [
    {
      name: "Classic Beef Burger",
      description: "Juicy beef patty with cheese, lettuce and tomato",
      price: 9000,
      image_url:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      category: "Burger",
    },
    {
      name: "Crispy Chicken Burger",
      description: "Crispy chicken fillet with fresh vegetables and sauce",
      price: 8500,
      image_url:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
      category: "Burger",
    },
    {
      name: "Chicken Wings",
      description: "Crispy chicken wings served with a flavorful sauce",
      price: 10000,
      image_url:
        "https://images.unsplash.com/photo-1527477396000-e27163b481c2",
      category: "Chicken",
    },
    {
      name: "Loaded French Fries",
      description: "Crispy fries topped with cheese and savory sauce",
      price: 7000,
      image_url:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
      category: "Sides",
    },
    {
      name: "Chicken Wrap",
      description: "Grilled chicken wrapped with fresh vegetables and sauce",
      price: 8000,
      image_url:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
      category: "Wraps",
    },
  ],
};

async function seedDatabase() {
  try {
    // Clear existing menu items first
    const { error: menuDeleteError } = await supabase
      .from("menu_items")
      .delete()
      .neq("id", 0);

    if (menuDeleteError) {
      throw menuDeleteError;
    }

    // Clear existing restaurants
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

    // Create restaurant-specific menu items
    const allMenuItems = [];

    for (const restaurant of savedRestaurants) {
      const restaurantMenu = menuItemsByRestaurant[restaurant.name] || [];

      for (const item of restaurantMenu) {
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