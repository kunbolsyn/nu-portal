import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Infocenter.css";

const categories = [
  {
    title: "About University",
    description: "Learn about our university's history, mission, and vision",
    subcategories: [
      { 
        title: "University History", 
        description: "Discover the rich history and heritage of our institution",
        icon: "fas fa-landmark",
        path: "/university-history"
      },
      { 
        title: "Mission and Values", 
        description: "Our guiding principles and institutional commitments",
        icon: "fas fa-bullseye",
        path: "/mission-values"
      },
      { 
        title: "Campus Map", 
        description: "Navigate our beautiful campus with our interactive map",
        icon: "fas fa-map",
        path: "/campus-map"
      },
      { 
        title: "Leadership", 
        description: "Meet the university's leadership team and board of trustees",
        icon: "fas fa-users",
        path: "/leadership"
      },
      { 
        title: "Accreditation", 
        description: "Information about our university's accreditations and rankings",
        icon: "fas fa-award",
        path: "/accreditation"
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
        icon: "fas fa-graduation-cap",
        path: "/schools"
      },
      { 
        title: "Library", 
        description: "Access our extensive library resources and services",
        icon: "fas fa-book",
        path: "/library"
      },
      { 
        title: "Office of the Registrar", 
        description: "Information about registration, transcripts, and academic records",
        icon: "fas fa-file-alt",
        path: "/registrar"
      },
      { 
        title: "Career Center", 
        description: "Resources for career planning and professional development",
        icon: "fas fa-briefcase",
        path: "/career-center"
      },
      { 
        title: "Academic Advising", 
        description: "Get guidance on academic planning and course selection",
        icon: "fas fa-user-graduate",
        path: "/academic-advising"
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
        icon: "fas fa-users",
        path: "/student-organizations"
      },
      { 
        title: "Sports Complex", 
        description: "Information about facilities, sports teams and recreational activities",
        icon: "fas fa-running",
        path: "/sports-complex"
      },
      { 
        title: "Department of Student Services", 
        description: "Support in campus life and in navigating extracurricular and social life",
        icon: "fas fa-hands-helping",
        path: "/department-of-student-services"
      },
      { 
        title: "Health & Wellness", 
        description: "Resources for maintaining physical and mental wellbeing",
        icon: "fas fa-heartbeat",
        path: "/health-wellness"
      },
      { 
        title: "Student Government", 
        description: "Information About Ministries, Student Fund Budget and Students’ Rights Committee",
        icon: "fas fa-fist-raised",
        path: "/student-government"
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
        icon: "fas fa-home",
        path: "/residence-halls"
      },
      { 
        title: "Housing Policies", 
        description: "Rules and regulations for campus housing",
        icon: "fas fa-clipboard-list",
        path: "/housing-policies"
      },
      { 
        title: "Application Process", 
        description: "How to apply for student housing",
        icon: "fas fa-file-signature",
        path: "/housing-application"
      },
      { 
        title: "Residential Life", 
        description: "Activities and support in residence halls",
        icon: "fas fa-door-open",
        path: "/residential-life"
      }
    ]
  }
];

const Infocenter = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="infocenter-container">
      <div className="infocenter-header">
        <i className="fas fa-info-circle"></i>
        <h1>Infocenter</h1>
      </div>
      
      <div className="infocenter-content">
        <div className="info-sidebar">
          <h2 className="sidebar-header">Categories</h2>
          <div className="sidebar-categories">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category-tab ${activeCategory === index ? "active" : ""}`}
                onClick={() => setActiveCategory(index)}
              >
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="info-content">
          <div className="subcategory-list">
            {categories[activeCategory].subcategories.map((subcategory, index) => (
              <Link
                to={subcategory.path}
                key={index}
                className="subcategory-card"
              >
                <div className="subcategory-icon">
                  <i className={subcategory.icon}></i>
                </div>
                <div className="subcategory-content">
                  <h3>{subcategory.title}</h3>
                  <p>{subcategory.description}</p>
                </div>
                <i className="fas fa-chevron-right"></i>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infocenter;