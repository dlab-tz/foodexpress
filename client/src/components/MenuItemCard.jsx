export default function MenuItemCard({ item }) {
  if (!item) return null;

  return (
    <div 
      style={{
        border: '1px solid #eee',
        borderRadius: '6px',
        padding: '12px',
        margin: '8px 0',
        backgroundColor: '#1a1a1a',
        color: '#ffffff'
      }}
    >
      {item.image_url && (
        <img 
          src={item.image_url} 
          alt={item.name || 'Menu item'} 
          style={{ width: '80px', height: '80px', objectFit: 'cover', float: 'right' }} 
        />
      )}
      <h4>{item.name || 'Unnamed Item'}</h4>
      <p>{item.description || 'No description available.'}</p>
      <strong>TZS {item.price ?? 'N/A'}</strong>
    </div>
  );
}