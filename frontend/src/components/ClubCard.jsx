// Reusable component displaying club data passed via props
function ClubCard({ name, category, description, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p><strong>Category:</strong> {category}</p>
      {description && <p><strong>Description:</strong> {description}</p>}
      <div className="card-actions">
        <button onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ClubCard;
