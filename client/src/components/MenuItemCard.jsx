function MenuItemCard({ item }) {
    return (
      <div className="menu-item-card">
        {item.image_url && (
          <img src={item.image_url} alt={item.name} />
        )}
  
        <h3>{item.name}</h3>
  
        <p>{item.description}</p>
  
        <p>Price: {item.price}</p>
      </div>
    );
  }
  
  export default MenuItemCard;