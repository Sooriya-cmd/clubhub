import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Clubs from "./pages/Clubs";
import Meetings from "./pages/Meetings";
import Announcements from "./pages/Announcements";

// App component defines the top-level layout with Navbar and page route definitions
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </div>
  );
}

export default App;
