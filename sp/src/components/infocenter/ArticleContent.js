import React from "react";
import "../../styles/infocenter/ArticleContent.css";

const ArticleContent = () => {
  return (
    <div className="university-history">
      <div className="page-header">
        <i className="fas fa-landmark"></i>
        <h1>Article Content</h1>
      </div>

      <div className="content-section">
        <p>
        This is a placeholder for article content. In a real launch, this would contain the full article content.
        </p>
        <h2>
        The article content would typically include:
        </h2>
        <p>
        Detailed information about the topic
        </p>
        <p>
        Related resources and links
        </p>
        <p>
        Contact information for relevant departments
        </p>
        <p>
        Any applicable forms or documents
        </p>
        
      </div>
    </div>
  );
};

export default ArticleContent;
