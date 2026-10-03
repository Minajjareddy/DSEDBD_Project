
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api";

function Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    gender: "",
    blood_group: "",
    height: "",
    weight: "",
    allergies: "",
    existing_conditions: "",
    emergency_contact: "",
    emergency_phone: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("healthToken");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const response = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Profile data:", response.data);

      if (response.data.length > 0) {
        const profile = response.data[0];

        setForm({
          age: profile.age || "",
          gender: profile.gender || "",
          blood_group: profile.blood_group || "",
          height: profile.height || "",
          weight: profile.weight || "",
          allergies: profile.allergies || "",
          existing_conditions: profile.existing_conditions || "",
          emergency_contact: profile.emergency_contact || "",
          emergency_phone: profile.emergency_phone || ""
        });
      }

    } catch (error) {
      console.error("Profile loading error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("healthToken");
        localStorage.removeItem("healthUser");

        alert("Your session has expired. Please login again.");

        navigate("/login");
      } else {
        alert(
          error.response?.data?.message ||
          "Failed to load profile."
        );
      }

    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("healthToken");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const response = await API.post(
        "/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Save profile response:", response.data);

      alert("Profile saved successfully!");

    } catch (error) {
      console.error("Profile save error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to save profile."
      );

    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="app-container">

        <Navbar />

        <div className="main-layout">

          <Sidebar />

          <main className="content">

            <h2>Loading profile...</h2>

          </main>

        </div>

      </div>
    );
  }


  return (
    <div className="app-container">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <main className="content">

          <section className="welcome-section">

            <div>

              <p className="small-heading">
                PERSONAL INFORMATION
              </p>

              <h1>
                My Health Profile
              </h1>

              <p>
                Keep your health information updated
                for your personal health assistant.
              </p>

            </div>

          </section>


          <section className="dashboard-section">

            <form onSubmit={handleSubmit}>

              <div className="health-grid">


                <div>
                  <label>
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                  />
                </div>


                <div>
                  <label>
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                <div>
                  <label>
                    Blood Group
                  </label>

                  <input
                    type="text"
                    name="blood_group"
                    value={form.blood_group}
                    onChange={handleChange}
                    placeholder="Example: O+"
                  />
                </div>


                <div>
                  <label>
                    Height (cm)
                  </label>

                  <input
                    type="number"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    placeholder="Example: 165"
                  />
                </div>


                <div>
                  <label>
                    Weight (kg)
                  </label>

                  <input
                    type="number"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="Example: 60"
                  />
                </div>


              </div>


              <div className="form-group">

                <label>
                  Allergies
                </label>

                <textarea
                  name="allergies"
                  value={form.allergies}
                  onChange={handleChange}
                  placeholder="Enter any known allergies"
                  rows="3"
                />

              </div>


              <div className="form-group">

                <label>
                  Existing Conditions
                </label>

                <textarea
                  name="existing_conditions"
                  value={form.existing_conditions}
                  onChange={handleChange}
                  placeholder="Enter any existing health conditions"
                  rows="3"
                />

              </div>


              <div className="form-group">

                <label>
                  Emergency Contact Name
                </label>

                <input
                  type="text"
                  name="emergency_contact"
                  value={form.emergency_contact}
                  onChange={handleChange}
                  placeholder="Emergency contact name"
                />

              </div>


              <div className="form-group">

                <label>
                  Emergency Contact Phone
                </label>

                <input
                  type="tel"
                  name="emergency_phone"
                  value={form.emergency_phone}
                  onChange={handleChange}
                  placeholder="Emergency contact phone"
                />

              </div>


              <button
                type="submit"
                className="primary-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Health Profile"}
              </button>

            </form>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Profile;



