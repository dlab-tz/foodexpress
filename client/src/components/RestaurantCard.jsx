function RestaurantCard({ restaurant, onSelect }) {
  return (
    <div
      className="restaurant-card"
      onClick={() => onSelect(restaurant.id)}
    >
      {restaurant.image_url && (
        <img src={restaurant.image_url} alt={restaurant.name} />
      )}

      <h3>{restaurant.name}</h3>

      <p>{restaurant.description}</p>

      {restaurant.cuisine_type && (
        <p>Cuisine: {restaurant.cuisine_type}</p>
      )}

      {restaurant.rating && (
        <p>Rating: {restaurant.rating}</p>
      )}
    </div>
  );
}

export default RestaurantCard;