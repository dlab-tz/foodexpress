import { useState, useEffect } from "react";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/restaurants")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        return res.json();
      })
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
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
    <div className="restaurant-grid">
      {restaurants.map((restaurant) => (
        <div className="restaurant-card" key={restaurant.id}>
          {restaurant.image_url && (
            <img src={restaurant.image_url} alt={restaurant.name} />
          )}
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
          {restaurant.cuisine_type && <p>Cuisine: {restaurant.cuisine_type}</p>}
          {restaurant.rating && <p>Rating: {restaurant.rating}</p>}
        </div>
      ))}
    </div>
  );
}

export default RestaurantList;