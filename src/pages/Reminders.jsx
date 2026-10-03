import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Reminders() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState([]);

  const addReminder = (e) => {
    e.preventDefault();

    if (!title || !time) {
      alert("Please enter reminder and time.");
      return;
    }

    setReminders([
      ...reminders,
      {
        title,
        time
      }
    ]);

    setTitle("");
    setTime("");
  };

  return (
    <div className="app-container">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <main className="content">

          <h1>⏰ Reminders</h1>

          <p className="page-description">
            Create reminders for medications, appointments,
            and daily health activities.
          </p>

          <form className="data-form" onSubmit={addReminder}>

            <label>Reminder</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Take medicine"
            />

            <label>Time</label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <button className="primary-btn">
              Add Reminder
            </button>

          </form>

          <div className="records">

            <h2>My Reminders</h2>

            {reminders.length === 0 ? (
              <div className="empty-state">
                No reminders created yet.
              </div>
            ) : (
              reminders.map((item, index) => (
                <div className="record-card" key={index}>

                  <h3>⏰ {item.title}</h3>

                  <p>Time: {item.time}</p>

                </div>
              ))
            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default Reminders;