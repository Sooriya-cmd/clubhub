// Reusable component displaying member data passed via props
function MemberCard({ name, club, year, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p><strong>Club:</strong> {club}</p>
      <p><strong>Year:</strong> {year}</p>
      <div className="card-actions">
        {/* onClick triggers parent handler passed via props */}
        <button onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default MemberCard;
