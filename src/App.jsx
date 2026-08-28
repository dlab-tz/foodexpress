import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  

  useEffect(() => {
    fetch("http://localhost:3000/api/foods")
      .then((response) => response.json())
      .then((data) => setFoods(data));
  }, []);

  const addToCart = (food) => {
    const existingFood = cart.find((item) => item.id === food.id);

    if (existingFood) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>🍔 Food Ordering</h1>

      <h2>Available Foods</h2>
      <input
  type="text"
  placeholder="Search for food..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="All">All Categories</option>
  <option value="Burger">Burger</option>
  <option value="Pizza">Pizza</option>
  <option value="Sides">Sides</option>
</select>

      <div className="food-container">
      {foods
  .filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter(
    (food) => category === "All" || food.category === category
  )
  .map((food) => (
          <div className="food-card" key={food.id}>
            <img src={food.image} alt={food.name} />

            <h3>{food.name}</h3>
            <p>Category: {food.category}</p>
            <p>Price: TSh {food.price}</p>

            <button onClick={() => addToCart(food)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>🛒 Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <h3>{item.name}</h3>

                <p>Price: TSh {item.price}</p>

                <div className="quantity">
                  <button onClick={() => decreaseQuantity(item.id)}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>
                </div>

                <p>
                  Subtotal: TSh {item.price * item.quantity}
                </p>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <h2>Total: TSh {total}</h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;