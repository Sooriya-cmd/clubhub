import { useState, useEffect } from "react";
import MemberCard from "../components/MemberCard";

function Members() {
  // useState stores data that changes and causes a re-render
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ name: "", club: "", year: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all members from the Express API
  const fetchMembers = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/members")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch members");
        }
        return res.json();
      })
      .then((data) => {
        setMembers(data);
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
    fetchMembers();
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
      // Update existing member via PUT
      fetch(`http://localhost:5000/api/members/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update member");
          }
          return res.json();
        })
        .then(() => {
          setEditingId(null);
          setFormData({ name: "", club: "", year: "" });
          fetchMembers();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      // Create new member via POST
      fetch("http://localhost:5000/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add member");
          }
          return res.json();
        })
        .then(() => {
          setFormData({ name: "", club: "", year: "" });
          fetchMembers();
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  // Fill form with member data for editing
  const handleEdit = (member) => {
    setEditingId(member._id);
    setFormData({
      name: member.name,
      club: member.club,
      year: member.year
    });
  };

  // Reset form and cancel editing mode
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", club: "", year: "" });
  };

  // Delete member via DELETE
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/members/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete member");
        }
        return res.json();
      })
      .then(() => {
        fetchMembers();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="page-container">
      <h2>Members</h2>

      {/* Controlled form for adding and editing members */}
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
            <label>Club</label>
            <input
              type="text"
              name="club"
              value={formData.club}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">{editingId ? "Update" : "Add Member"}</button>
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
        members.length === 0 ? (
          <p>No members found.</p>
        ) : (
          <div className="cards-list">
            {members.map((member) => (
              <MemberCard
                key={member._id}
                name={member.name}
                club={member.club}
                year={member.year}
                onEdit={() => handleEdit(member)}
                onDelete={() => handleDelete(member._id)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Members;
