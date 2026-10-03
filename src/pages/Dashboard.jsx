
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HealthCard from "../components/HealthCard";
import ReminderCard from "../components/ReminderCard";
import API from "../api";

function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // Get logged-in user from localStorage
      const storedUser = localStorage.getItem("healthUser");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.full_name || "User");
      }

      // Get JWT token
      const token = localStorage.getItem("healthToken");

      if (!token) {
        console.log("No login token found");
        setLoading(false);
        return;
      }

      // Get health profile from backend
      const response = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Profile response:", response.data);

      if (response.data.length > 0) {
        setProfile(response.data[0]);
      }

    } catch (error) {
      console.error("Dashboard error:", error);

      if (error.response) {
        console.log("Backend response:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <main className="content">

          <section className="welcome-section">

            <div>
              <p className="small-heading">
                PERSONAL HEALTH DASHBOARD
              </p>

              <h1>
                Hello, {userName} 👋
              </h1>

              <p>
                Keep track of your health information in one place.
              </p>

              {profile && (
                <p>
                  Your health profile is connected to your account.
                </p>
              )}

            </div>

            <div className="health-status">
              <span>●</span> Health tracking active
            </div>

          </section>


          <div className="health-grid">

            <HealthCard
              icon="🩺"
              title="Symptoms"
              value="0"
              description="Symptoms recorded"
            />

            <HealthCard
              icon="💊"
              title="Medications"
              value="0"
              description="Active medications"
            />

            <HealthCard
              icon="📅"
              title="Appointments"
              value="0"
              description="Upcoming appointments"
            />

            <HealthCard
              icon="🏃"
              title="Activities"
              value="0"
              description="Activities logged"
            />

          </div>


          {profile && (
            <section className="dashboard-section">

              <div className="section-header">
                <h2>My Health Profile</h2>
              </div>

              <div className="profile-summary">

                <p>
                  <strong>Age:</strong>{" "}
                  {profile.age || "Not provided"}
                </p>

                <p>
                  <strong>Gender:</strong>{" "}
                  {profile.gender || "Not provided"}
                </p>

                <p>
                  <strong>Blood Group:</strong>{" "}
                  {profile.blood_group || "Not provided"}
                </p>

                <p>
                  <strong>Height:</strong>{" "}
                  {profile.height || "Not provided"}
                </p>

                <p>
                  <strong>Weight:</strong>{" "}
                  {profile.weight || "Not provided"}
                </p>

              </div>

            </section>
          )}


          <section className="dashboard-section">

            <div className="section-header">
              <h2>Today's Reminders</h2>
            </div>

            <ReminderCard
              title="Take your medication"
              time="No medication scheduled"
              type="Medication"
            />

            <ReminderCard
              title="Health check-in"
              time="Anytime today"
              type="Daily Activity"
            />

          </section>


          <section className="dashboard-section ai-preview">

            <div>
              <h2>🤖 AI Health Assistant</h2>

              <p>
                Get general health insights based on the
                information you record in your account.
              </p>
            </div>

            <a
              href="/ai-assistant"
              className="secondary-btn"
            >
              Open AI Assistant
            </a>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;

