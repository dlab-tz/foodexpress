import { useEffect, useState } from "react";

function RestaurantList({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading restaurants...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="restaurant-card"
          onClick={() => onSelectRestaurant(restaurant.id)}
        >
          {restaurant.image_url && (
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
            />
          )}

          <h3>{restaurant.name}</h3>

          <p>{restaurant.description}</p>
        </div>
      ))}
    </div>
  );
}

export default RestaurantList;