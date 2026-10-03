import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Appointments() {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (e) => {
    e.preventDefault();

    if (!doctor || !date) {
      alert("Please enter doctor and date.");
      return;
    }

    setAppointments([
      ...appointments,
      {
        doctor,
        date,
        time
      }
    ]);

    setDoctor("");
    setDate("");
    setTime("");
  };

  return (
    <div className="app-container">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <main className="content">

          <h1>📅 Appointments</h1>

          <p className="page-description">
            Manage your upcoming healthcare appointments.
          </p>

          <form className="data-form" onSubmit={addAppointment}>

            <label>Doctor / Hospital</label>

            <input
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              placeholder="Doctor or hospital name"
            />

            <label>Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Time</label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <button className="primary-btn">
              Add Appointment
            </button>

          </form>

          <div className="records">

            <h2>Upcoming Appointments</h2>

            {appointments.length === 0 ? (
              <div className="empty-state">
                No appointments scheduled.
              </div>
            ) : (
              appointments.map((item, index) => (
                <div className="record-card" key={index}>

                  <h3>👨‍⚕️ {item.doctor}</h3>

                  <p>Date: {item.date}</p>

                  <p>
                    Time: {item.time || "Not specified"}
                  </p>

                </div>
              ))
            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default Appointments;