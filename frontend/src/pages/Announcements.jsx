import { useState, useEffect } from "react";
import AnnouncementCard from "../components/AnnouncementCard";

function Announcements() {
  // useState stores data that changes and causes a re-render
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all announcements from the Express API
  const fetchAnnouncements = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/announcements")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch announcements");
        }
        return res.json();
      })
      .then((data) => {
        setAnnouncements(data);
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
    fetchAnnouncements();
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
      // Update existing announcement via PUT
      fetch(`http://localhost:5000/api/announcements/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update announcement");
          }
          return res.json();
        })
        .then(() => {
          setEditingId(null);
          setFormData({ title: "", message: "" });
          fetchAnnouncements();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      // Create new announcement via POST
      fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add announcement");
          }
          return res.json();
        })
        .then(() => {
          setFormData({ title: "", message: "" });
          fetchAnnouncements();
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  // Fill form with announcement data for editing
  const handleEdit = (announcement) => {
    setEditingId(announcement._id);
    setFormData({
      title: announcement.title,
      message: announcement.message
    });
  };

  // Reset form and cancel editing mode
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", message: "" });
  };

  // Delete announcement via DELETE
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete announcement");
        }
        return res.json();
      })
      .then(() => {
        fetchAnnouncements();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="page-container">
      <h2>Announcements</h2>

      {/* Controlled form for adding and editing announcements */}
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
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">{editingId ? "Update" : "Add Announcement"}</button>
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
        announcements.length === 0 ? (
          <p>No announcements found.</p>
        ) : (
          <div className="cards-list">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                title={announcement.title}
                message={announcement.message}
                onEdit={() => handleEdit(announcement)}
                onDelete={() => handleDelete(announcement._id)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Announcements;
