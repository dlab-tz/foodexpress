import { useCart } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <h3>{item.name}</h3>

          <p>Price: {item.price}</p>

          <label>
            Quantity:{" "}
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, Number(e.target.value))
              }
            />
          </label>

          <p>
            Subtotal:{" "}
            {Number(item.price) * item.quantity}
          </p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: {totalAmount}</h3>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default CartPage;