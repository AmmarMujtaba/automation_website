import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeSetupScreens.css";

const HomeSetupScreen = () => {
  const [homeName, setHomeName] = useState("");
  const [homes, setHomes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    fetch("https://saviotserver.vercel.app/sendHomes?username=ammar")
      .then((res) => res.json())
      .then((data) => {
        const apiHomes = data.homes
          .filter((home) => home.title) // Only valid homes
          .map((home) => home.title);
        setHomes(apiHomes);
      })
      .catch((err) => console.error("Error fetching homes:", err));
  }, []);


  const handleAddHome = () => {
    if (homeName.trim()) {
      setHomes((prev) => [...prev, homeName.trim()]);
      setHomeName("");
    }
  };


  const handleNext = () => {
    if (homes.length === 0) {
      setShowPopup(true);
      return;
    }
    navigate("/home");
  };


  const handleHomeClick = (homeTitle) => {
    navigate("/home", { state: { homeTitle } });
  };

  return (
    <div className="home-setup-container">
      <h1 className="home-setup-title">Welcome to SAVIOT Setup</h1>
      <p className="home-setup-description">
        🌟 Welcome to <strong>SAVIOT</strong> — your smart home energy companion! <br />
        🏠 Here, you can add the homes 🏡 you want to monitor and manage.<br />
        ⚡ Save energy, reduce electricity costs, and take control of your devices from anywhere!<br />
        💡 Let’s start by adding the homes you want to control, then move on to rooms and appliances!
      </p>

      <div className="home-input-wrapper">
        <label className="home-input-label">Enter Home Name:</label>
        <input
          type="text"
          value={homeName}
          onChange={(e) => setHomeName(e.target.value)}
          className="home-input-field"
          placeholder="e.g., Home A"
        />
        <button onClick={handleAddHome} className="add-home-button">
          Add Home
        </button>
      </div>

      {homes.length > 0 && (
        <div className="added-homes">
          <h2>Available Homes:</h2>
          <ul>
            {homes.map((home, index) => (
              <li
                key={index}
                onClick={() => handleHomeClick(home)}
                className="home-list-item"
                style={{ cursor: "pointer", color: "white" }}
              >
                {home}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleNext} className="next-button">
        Next
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Please add at least one home before proceeding.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSetupScreen;
