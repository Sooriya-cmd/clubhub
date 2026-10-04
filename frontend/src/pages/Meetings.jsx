import { useState, useEffect } from "react";
import MeetingCard from "../components/MeetingCard";

function Meetings() {
  // useState stores data that changes and causes a re-render
  const [meetings, setMeetings] = useState([]);
  const [formData, setFormData] = useState({ title: "", date: "", venue: "", agenda: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all meetings from the Express API
  const fetchMeetings = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/meetings")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch meetings");
        }
        return res.json();
      })
      .then((data) => {
        setMeetings(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // useEffect fetches data after the component renders
  useEffect(() => {
    fetchMeetings();
  }, []);

  // Update form state on controlled input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission for both Create and Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing meeting via PUT
      fetch(`http://localhost:5000/api/meetings/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update meeting");
          }
          return res.json();
        })
        .then(() => {
          setEditingId(null);
          setFormData({ title: "", date: "", venue: "", agenda: "" });
          fetchMeetings();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      // Create new meeting via POST
      fetch("http://localhost:5000/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add meeting");
          }
          return res.json();
        })
        .then(() => {
          setFormData({ title: "", date: "", venue: "", agenda: "" });
          fetchMeetings();
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  // Fill form with meeting data for editing
  const handleEdit = (meeting) => {
    setEditingId(meeting._id);
    const dateFormatted = meeting.date ? meeting.date.slice(0, 10) : "";
    setFormData({
      title: meeting.title,
      date: dateFormatted,
      venue: meeting.venue,
      agenda: meeting.agenda || ""
    });
  };

  // Reset form and cancel editing mode
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", date: "", venue: "", agenda: "" });
  };

  // Delete meeting via DELETE
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/meetings/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete meeting");
        }
        return res.json();
      })
      .then(() => {
        fetchMeetings();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="page-container">
      <h2>Meetings</h2>

      {/* Controlled form for adding and editing meetings */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Agenda</label>
            <textarea
              name="agenda"
              value={formData.agenda}
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit">{editingId ? "Update" : "Add Meeting"}</button>
            {editingId ? (
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      {/* Conditional rendering for loading and error states */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Conditional rendering for empty vs data states */}
      {!loading && !error && (
        meetings.length === 0 ? (
          <p>No meetings found.</p>
        ) : (
          <div className="cards-list">
            {meetings.map((meeting) => (
              <MeetingCard
                key={meeting._id}
                title={meeting.title}
                date={meeting.date}
                venue={meeting.venue}
                agenda={meeting.agenda}
                onEdit={() => handleEdit(meeting)}
                onDelete={() => handleDelete(meeting._id)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Meetings;
