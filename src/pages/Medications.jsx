import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Medications() {
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [medications, setMedications] = useState([]);

  const addMedication = (e) => {
    e.preventDefault();

    if (!medicine || !dosage) {
      alert("Please enter medicine and dosage.");
      return;
    }

    setMedications([
      ...medications,
      {
        medicine,
        dosage,
        time
      }
    ]);

    setMedicine("");
    setDosage("");
    setTime("");
  };

  return (
    <div className="app-container">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <main className="content">

          <h1>💊 Medications</h1>

          <p className="page-description">
            Keep track of your medications and dosage schedules.
          </p>

          <form className="data-form" onSubmit={addMedication}>

            <label>Medicine Name</label>

            <input
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              placeholder="Example: Medicine name"
            />

            <label>Dosage</label>

            <input
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="Example: 500 mg"
            />

            <label>Time</label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <button className="primary-btn">
              Add Medication
            </button>

          </form>

          <div className="records">

            <h2>My Medications</h2>

            {medications.length === 0 ? (
              <div className="empty-state">
                No medications added yet.
              </div>
            ) : (
              medications.map((item, index) => (
                <div className="record-card" key={index}>

                  <h3>💊 {item.medicine}</h3>

                  <p>Dosage: {item.dosage}</p>

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

export default Medications;