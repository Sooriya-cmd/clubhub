import { Link } from "react-router-dom";

// Home component contains the title, a short welcome line, and links to the four pages
function Home() {
  return (
    <div className="page-container">
      <h1>ClubHub</h1>
      <p>Welcome to ClubHub, the college club management system.</p>
      <div className="home-links">
        <Link to="/members">Members</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/meetings">Meetings</Link>
        <Link to="/announcements">Announcements</Link>
      </div>
    </div>
  );
}

export default Home;
