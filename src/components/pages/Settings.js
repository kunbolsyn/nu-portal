// src/components/pages/Settings.js
import React, { useEffect, useState } from "react";
import "../../styles/Settings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="settings-container">
      <h2><i className="fas fa-cog"></i> Settings</h2>
      <div className="setting-item">
        <label htmlFor="darkModeToggle">Dark Mode</label>
        <input
          type="checkbox"
          id="darkModeToggle"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>
    </div>
  );
};

export default Settings;
