import { useCart } from "../context/CartContext";

function MenuItemCard({ item }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className="menu-item-card">
      {item.image_url && (
        <img src={item.image_url} alt={item.name} />
      )}

      <h3>{item.name}</h3>

      <p>{item.description}</p>

      <p>Price: {item.price}</p>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default MenuItemCard;