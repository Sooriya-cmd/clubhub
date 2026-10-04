// Reusable component displaying announcement data passed via props
function AnnouncementCard({ title, message, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{message}</p>
      <div className="card-actions">
        <button onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default AnnouncementCard;
