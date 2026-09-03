import RestaurantList from "./components/RestaurantList";
import MenuItemList from "./components/MenuItemList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>FoodExpress</h1>

      <RestaurantList />

      <h2>Munchy Restaurant Menu</h2>
      <MenuItemList restaurantId={2} />
    </div>
  );
}

export default App;