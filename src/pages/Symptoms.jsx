import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Symptoms() {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [notes, setNotes] = useState("");
  const [symptoms, setSymptoms] = useState([]);

  const addSymptom = (e) => {
    e.preventDefault();

    if (!symptom) {
      alert("Please enter a symptom.");
      return;
    }

    const newSymptom = {
      symptom,
      severity,
      notes,
      date: new Date().toLocaleDateString()
    };

    setSymptoms([...symptoms, newSymptom]);

    setSymptom("");
    setNotes("");
  };

  return (
    <div className="app-container">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <main className="content">

          <h1>🩺 Symptoms</h1>

          <p className="page-description">
            Record and monitor symptoms you experience.
          </p>

          <form className="data-form" onSubmit={addSymptom}>

            <label>Symptom</label>

            <input
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              placeholder="Example: Headache"
            />

            <label>Severity</label>

            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option>Mild</option>
              <option>Moderate</option>
              <option>Severe</option>
            </select>

            <label>Notes</label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your symptom..."
            />

            <button className="primary-btn">
              Add Symptom
            </button>

          </form>

          <div className="records">

            <h2>Recorded Symptoms</h2>

            {symptoms.length === 0 ? (
              <div className="empty-state">
                No symptoms recorded yet.
              </div>
            ) : (
              symptoms.map((item, index) => (
                <div className="record-card" key={index}>

                  <h3>{item.symptom}</h3>

                  <p>
                    Severity: <strong>{item.severity}</strong>
                  </p>

                  <p>{item.notes}</p>

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

export default Symptoms;