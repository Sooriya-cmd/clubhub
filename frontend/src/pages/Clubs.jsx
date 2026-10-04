import { useState, useEffect } from "react";
import ClubCard from "../components/ClubCard";

function Clubs() {
  // useState stores data that changes and causes a re-render
  const [clubs, setClubs] = useState([]);
  const [formData, setFormData] = useState({ name: "", category: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all clubs from the Express API
  const fetchClubs = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/clubs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch clubs");
        }
        return res.json();
      })
      .then((data) => {
        setClubs(data);
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
    fetchClubs();
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
      // Update existing club via PUT
      fetch(`http://localhost:5000/api/clubs/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update club");
          }
          return res.json();
        })
        .then(() => {
          setEditingId(null);
          setFormData({ name: "", category: "", description: "" });
          fetchClubs();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      // Create new club via POST
      fetch("http://localhost:5000/api/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add club");
          }
          return res.json();
        })
        .then(() => {
          setFormData({ name: "", category: "", description: "" });
          fetchClubs();
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  // Fill form with club data for editing
  const handleEdit = (club) => {
    setEditingId(club._id);
    setFormData({
      name: club.name,
      category: club.category,
      description: club.description || ""
    });
  };

  // Reset form and cancel editing mode
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", category: "", description: "" });
  };

  // Delete club via DELETE
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/clubs/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete club");
        }
        return res.json();
      })
      .then(() => {
        fetchClubs();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="page-container">
      <h2>Clubs</h2>

      {/* Controlled form for adding and editing clubs */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit">{editingId ? "Update" : "Add Club"}</button>
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
        clubs.length === 0 ? (
          <p>No clubs found.</p>
        ) : (
          <div className="cards-list">
            {clubs.map((club) => (
              <ClubCard
                key={club._id}
                name={club.name}
                category={club.category}
                description={club.description}
                onEdit={() => handleEdit(club)}
                onDelete={() => handleDelete(club._id)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Clubs;
