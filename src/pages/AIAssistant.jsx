import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AIAssistant() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const askAssistant = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter your question.");
      return;
    }

    setResponse(
      "I can provide general health information based on the details you enter. For diagnosis, treatment decisions, or urgent symptoms, please consult a qualified healthcare professional."
    );
  };

  return (
    <div className="app-container">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <main className="content">

          <div className="ai-header">

            <div className="ai-icon">
              🤖
            </div>

            <div>
              <h1>AI Health Assistant</h1>

              <p>
                Your personal health information assistant
              </p>
            </div>

          </div>

          <div className="ai-box">

            <h2>Ask a Health Question</h2>

            <p>
              Enter symptoms or general health questions
              to receive general information.
            </p>

            <form onSubmit={askAssistant}>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Example: What information should I record when I have a headache?"
              />

              <button className="primary-btn">
                Ask Assistant
              </button>

            </form>

            {response && (
              <div className="ai-response">

                <h3>🤖 Assistant</h3>

                <p>{response}</p>

              </div>
            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default AIAssistant;