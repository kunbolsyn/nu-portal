import React from "react";
import "../../styles/Infocenter.css";

const Infocenter = () => {
  return (
    <div className="infocenter">
      <h2>Welcome to the Infocenter</h2>
      <div className="info-categories">
        <div className="category">
          <h3>About University</h3>
          <p>General overview, mission, and values of the university.</p>
        </div>
        <div className="category">
          <h3>Academic Programs</h3>
          <p>Information on undergraduate and graduate programs, faculties, and majors.</p>
        </div>
        <div className="category">
          <h3>Campus Life</h3>
          <p>Details about housing, student clubs, dining, and campus services.</p>
        </div>
        <div className="category">
          <h3>Admissions</h3>
          <p>How to apply, important dates, requirements, and contact info.</p>
        </div>
        <div className="category">
          <h3>Contacts</h3>
          <p>Department contacts, support emails, and phone numbers.</p>
        </div>
        <div className="category">
          <h3>Contacts</h3>
          <p>Department contacts, support emails, and phone numbers.</p>
        </div>
      </div>
    </div>
  );
};

export default Infocenter;
