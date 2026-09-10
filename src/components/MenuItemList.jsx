import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";

function MenuItemList({ restaurantId }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`http://localhost:5000/restaurants/${restaurantId}/menu`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }

        return response.json();
      })
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
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
    <div className="menu-list">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MenuItemList;