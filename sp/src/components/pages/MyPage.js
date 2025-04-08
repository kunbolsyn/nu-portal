import React from "react";
import "../../styles/MyPage.css";

const MyPage = () => {
  const yearOfStudy = "2025"; // Actual year of study
  const major = "Computer Science"; // Example major
  const department = "SEDS"; // Example department
  const gpa = "3.8"; // Example GPA
  const phoneNumber = "+X(X)XXX XX XX"; // Example phone number
  const email = "name.surname@nu.edu.kz"; // Example email

  return (
    <div className="mypage">
      <div className="about-section">
        <div className="about-info">
          <img
            src={process.env.PUBLIC_URL + "/profile.png"}
            alt="Profile"
            className="profile-pic"
          />
          <div className="details">
            <h2>Name Surname</h2>
            <div className="info-row">
              <div className="info-item">
                <span className="icon">📧</span>
                <span>{email}</span>
              </div>
              <div className="info-item">
                <span className="icon">📞</span>
                <span>{phoneNumber}</span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="icon">🎓</span>
                <span>{yearOfStudy}</span>
              </div>
              <div className="info-item">
                <span className="icon">🎓</span>
                <span>{major}</span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="icon">🏫</span>
                <span>{department}</span>
              </div>
              <div className="info-item">
                <span className="icon">📊</span>
                <span>{gpa}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
