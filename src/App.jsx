
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Symptoms from "./pages/Symptoms";
import Medications from "./pages/Medications";
import Appointments from "./pages/Appointments";
import Activities from "./pages/Activities";
import Reminders from "./pages/Reminders";
import AIAssistant from "./pages/AIAssistant";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/symptoms"
        element={<Symptoms />}
      />

      <Route
        path="/medications"
        element={<Medications />}
      />

      <Route
        path="/appointments"
        element={<Appointments />}
      />

      <Route
        path="/activities"
        element={<Activities />}
      />

      <Route
        path="/reminders"
        element={<Reminders />}
      />

      <Route
        path="/ai-assistant"
        element={<AIAssistant />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;

