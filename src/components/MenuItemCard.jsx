function MenuItemCard({ item }) {
    return (
      <div className="menu-item-card">
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.name}
            className="menu-item-image"
          />
        )}

        <h4>{item.name}</h4>

        {item.description && <p>{item.description}</p>}

        <p className="menu-item-price">
          TSh {Number(item.price).toLocaleString()}
        </p>
      </div>
    );
  }

  export default MenuItemCard;
