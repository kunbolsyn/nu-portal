// UniversityHistory.js
import React from "react";
import "../../styles/infocenter/UniversityHistory.css";

const UniversityHistory = () => {
  return (
    <div className="university-history">
      <div className="page-header">
        <i className="fas fa-landmark"></i>
        <h1>University History</h1>
      </div>
      
      <div className="content-section">
        <h2>Our Founding</h2>
        <p>Founded in 19XX, our university began with a vision to...</p>
        
        <h2>Historical Milestones</h2>
        <ul>
          <li>19XX - Established as a small college</li>
          <li>19XX - Became a full-fledged university</li>
          <li>20XX - Expanded to current campus</li>
        </ul>
        
        <h2>Notable Alumni</h2>
        <p>Our alumni include leaders in various fields...</p>
      </div>
    </div>
  );
};

export default UniversityHistory;