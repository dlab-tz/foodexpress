import { useState } from "react";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetail";
import "./App.css";

function App() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const handleSelectRestaurant = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurantId(null);
  };

  return (
    <div className="App">
      <h1>FoodExpress</h1>

      {!selectedRestaurantId ? (
        <>
          <h2>Restaurants</h2>

          <RestaurantList
            onSelectRestaurant={handleSelectRestaurant}
          />
        </>
      ) : (
        <RestaurantDetail
          restaurantId={selectedRestaurantId}
          onBack={handleBackToRestaurants}
        />
      )}
    </div>
  );
}

export default App;
