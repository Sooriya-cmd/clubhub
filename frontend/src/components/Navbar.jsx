import { Link } from "react-router-dom";

// Navbar component renders navigation links using React Router Link components
function Navbar() {
  return (
    <nav className="navbar">
      <h2>ClubHub</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/members">Members</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/meetings">Meetings</Link>
        <Link to="/announcements">Announcements</Link>
      </div>
    </nav>
  );
}

export default Navbar;
