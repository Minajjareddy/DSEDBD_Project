import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span>🏥</span>
        Health Hub
      </div>

      <div className="sidebar-menu">

        <NavLink to="/dashboard">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/profile">
          👤 Profile
        </NavLink>

        <NavLink to="/symptoms">
          🩺 Symptoms
        </NavLink>

        <NavLink to="/medications">
          💊 Medications
        </NavLink>

        <NavLink to="/appointments">
          📅 Appointments
        </NavLink>

        <NavLink to="/activities">
          🏃 Activities
        </NavLink>

        <NavLink to="/reminders">
          ⏰ Reminders
        </NavLink>

        <NavLink to="/ai-assistant">
          🤖 AI Assistant
        </NavLink>

      </div>
    </aside>
  );
}

export default Sidebar;