// Infocenter.js
import React, { useState } from "react";
import "../../styles/Infocenter.css";

const categories = [
  {
    title: "About University",
    description: "Learn about our university's history, mission, and vision",
    subcategories: [
      { 
        title: "University History", 
        description: "Discover the rich history and heritage of our institution",
        icon: "fas fa-landmark"
      },
      { 
        title: "Mission and Values", 
        description: "Our guiding principles and institutional commitments",
        icon: "fas fa-bullseye"
      },
      { 
        title: "Campus Map", 
        description: "Navigate our beautiful campus with our interactive map",
        icon: "fas fa-map"
      },
      { 
        title: "Leadership", 
        description: "Meet the university's leadership team and board of trustees",
        icon: "fas fa-users"
      },
      { 
        title: "Accreditation", 
        description: "Information about our university's accreditations and rankings",
        icon: "fas fa-award"
      }
    ]
  },
  {
    title: "Academics",
    description: "Explore academic resources, programs, and support services",
    subcategories: [
      { 
        title: "Schools", 
        description: "Our colleges and schools offering diverse academic programs",
        icon: "fas fa-graduation-cap"
      },
      { 
        title: "Library", 
        description: "Access our extensive library resources and services",
        icon: "fas fa-book"
      },
      { 
        title: "Office of the Registrar", 
        description: "Information about registration, transcripts, and academic records",
        icon: "fas fa-file-alt"
      },
      { 
        title: "Career and Advising Center", 
        description: "Resources for career planning and professional development",
        icon: "fas fa-briefcase"
      },
      { 
        title: "Academic Advising Office", 
        description: "Get guidance on academic planning and course selection",
        icon: "fas fa-user-graduate"
      }
    ]
  },
  {
    title: "Student Life",
    description: "Discover campus life, activities, and community engagement",
    subcategories: [
      { 
        title: "Student Organizations", 
        description: "Explore the diverse clubs and organizations on campus",
        icon: "fas fa-users"
      },
      { 
        title: "Athletics and Recreation", 
        description: "Information about sports teams and recreational activities",
        icon: "fas fa-running"
      },
      { 
        title: "Campus Events", 
        description: "Stay updated with upcoming events and activities",
        icon: "fas fa-calendar-alt"
      },
      { 
        title: "Health and Wellness", 
        description: "Resources for maintaining physical and mental wellbeing",
        icon: "fas fa-heartbeat"
      },
      { 
        title: "Dining Services", 
        description: "Information about on-campus dining options and meal plans",
        icon: "fas fa-utensils"
      }
    ]
  },
  {
    title: "Student Housing",
    description: "Housing options, policies, and residential life",
    subcategories: [
      { 
        title: "Residence Halls", 
        description: "Overview of on-campus housing facilities",
        icon: "fas fa-home"
      },
      { 
        title: "Housing Policies", 
        description: "Rules and regulations for campus housing",
        icon: "fas fa-clipboard-list"
      },
      { 
        title: "Application Process", 
        description: "How to apply for student housing",
        icon: "fas fa-file-signature"
      },
      { 
        title: "Residential Life", 
        description: "Activities and support in residence halls",
        icon: "fas fa-door-open"
      }
    ]
  }
];

const Infocenter = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState(0);

  return (
    <div className="infocenter-container">
      <div className="info-sidebar">
        <h2 className="sidebar-header">Categories</h2>
        <div className="sidebar-categories">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-tab ${activeCategory === index ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(index);
                setActiveSubcategory(0);
              }}
            >
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="info-content">
        <h1 className="content-header">{categories[activeCategory].title}</h1>
        
        <div className="subcategory-list">
          {categories[activeCategory].subcategories.map((subcategory, index) => (
            <div
              key={index}
              className={`subcategory-card ${activeSubcategory === index ? "active" : ""}`}
              onClick={() => setActiveSubcategory(index)}
            >
              <div className="subcategory-icon">
                <i className={subcategory.icon}></i>
              </div>
              <div className="subcategory-content">
                <h3>{subcategory.title}</h3>
                <p>{subcategory.description}</p>
              </div>
              <i className="fas fa-chevron-right"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Infocenter;