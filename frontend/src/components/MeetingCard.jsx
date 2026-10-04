// Reusable component displaying meeting data passed via props
function MeetingCard({ title, date, venue, agenda, onEdit, onDelete }) {
  // Format the ISO date string into a readable local date string
  const formattedDate = date ? new Date(date).toLocaleDateString() : "";

  return (
    <div className="card">
      <h3>{title}</h3>
      <p><strong>Date:</strong> {formattedDate}</p>
      <p><strong>Venue:</strong> {venue}</p>
      {agenda && <p><strong>Agenda:</strong> {agenda}</p>}
      <div className="card-actions">
        <button onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default MeetingCard;
