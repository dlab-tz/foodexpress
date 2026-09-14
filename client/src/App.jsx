import { useState } from "react";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetail";
import CartPage from "./components/CartPage";
import { CartProvider, useCart } from "./context/CartContext";
import "./App.css";

function AppContent() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const { cartItems } = useCart();

  const handleSelectRestaurant = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    setShowCart(false);
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurantId(null);
  };

  const handleOpenCart = () => {
    setShowCart(true);
    setSelectedRestaurantId(null);
  };

  const handleBackFromCart = () => {
    setShowCart(false);
  };

  return (
    <div className="App">
      <h1>FoodExpress</h1>

      <button onClick={handleOpenCart}>
        Cart ({cartItems.length})
      </button>

      {showCart ? (
        <>
          <button onClick={handleBackFromCart}>
            Back to Restaurants
          </button>

          <CartPage />
        </>
      ) : !selectedRestaurantId ? (
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

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;