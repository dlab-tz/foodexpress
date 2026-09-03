import { useState, useEffect } from "react";
import MenuItemCard from "./MenuItemCard";

function MenuItemList({ restaurantId }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/restaurants/${restaurantId}/menu`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }

        return res.json();
      })
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [restaurantId]);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (menuItems.length === 0) {
    return <p>No menu items found.</p>;
  }

  return (
    <div className="menu-item-grid">
      {menuItems.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}

export default MenuItemList;