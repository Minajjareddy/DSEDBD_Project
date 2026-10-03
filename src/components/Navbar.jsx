import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("healthUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span>❤️</span>
        AI Personal Health Assistant
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/ai-assistant">AI Assistant</Link>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;