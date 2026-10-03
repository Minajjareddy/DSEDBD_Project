import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Activities() {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [activities, setActivities] = useState([]);

  const addActivity = (e) => {
    e.preventDefault();

    if (!activity) {
      alert("Please enter an activity.");
      return;
    }

    setActivities([
      ...activities,
      {
        activity,
        duration,
        date: new Date().toLocaleDateString()
      }
    ]);

    setActivity("");
    setDuration("");
  };

  return (
    <div className="app-container">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <main className="content">

          <h1>🏃 Daily Activities</h1>

          <p className="page-description">
            Record your daily health and wellness activities.
          </p>

          <form className="data-form" onSubmit={addActivity}>

            <label>Activity</label>

            <input
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="Example: Walking"
            />

            <label>Duration</label>

            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Example: 30 minutes"
            />

            <button className="primary-btn">
              Add Activity
            </button>

          </form>

          <div className="records">

            <h2>Activity History</h2>

            {activities.length === 0 ? (
              <div className="empty-state">
                No activities recorded yet.
              </div>
            ) : (
              activities.map((item, index) => (
                <div className="record-card" key={index}>

                  <h3>🏃 {item.activity}</h3>

                  <p>
                    Duration: {item.duration || "Not specified"}
                  </p>

                  <small>{item.date}</small>

                </div>
              ))
            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default Activities;