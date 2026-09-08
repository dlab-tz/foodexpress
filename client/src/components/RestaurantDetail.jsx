import { useState, useEffect } from "react";
import MenuItemList from "./MenuItemList";

function RestaurantDetail({ restaurantId }) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/restaurants/${restaurantId}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("Restaurant not found");
        }

        if (!res.ok) {
          throw new Error("Failed to fetch restaurant");
        }

        return res.json();
      })
      .then((data) => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [restaurantId]);

  if (loading) {
    return <p>Loading restaurant...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!restaurant) {
    return <p>Restaurant not found.</p>;
  }

  return (
    <div className="restaurant-detail">
      {restaurant.image_url && (
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="restaurant-detail-image"
        />
      )}

      <h2>{restaurant.name}</h2>

      <p>{restaurant.description}</p>

      {restaurant.cuisine_type && (
        <p>Cuisine: {restaurant.cuisine_type}</p>
      )}

      {restaurant.rating && (
        <p>Rating: {restaurant.rating}</p>
      )}

      <h3>Menu</h3>

      <MenuItemList restaurantId={restaurant.id} />
    </div>
  );
}

export default RestaurantDetail;