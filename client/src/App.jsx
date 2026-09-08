import { useState } from "react";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetail";
import "./App.css";

function App() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  return (
    <div className="App">
      <h1>FoodExpress</h1>

      <RestaurantList
        onSelectRestaurant={setSelectedRestaurantId}
      />

      {selectedRestaurantId && (
        <RestaurantDetail
          restaurantId={selectedRestaurantId}
        />
      )}
    </div>
  );
}

export default App;