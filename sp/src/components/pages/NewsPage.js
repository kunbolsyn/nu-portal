import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ useNavigate added
import "../../styles/NewsPage.css";

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ for back navigation
  const [news, setNews] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`https://senior-project-java-backend.onrender.com/api/news/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((n) => String(n.news_id) === id); // ensure id comparison is correct
        setNews(found);
      });
  }, [id]);

  if (!news) return <div className="news-detail-page">Loading...</div>;

  return (
    <div className="news-detail-page">
      <div className="image-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <img
          src={
            news.photos?.[0]?.filePath ||
            `${process.env.PUBLIC_URL}/images/default-news.jpg`
          }
          alt={news.newsTitle}
          className="news-detail-image"
        />
      </div>

      <h1>{news.newsTitle}</h1>
      <p className="meta">
        <i className="fas fa-user"></i> {news.author} &nbsp;&nbsp;
        <i className="fas fa-calendar-alt"></i> {news.newsDatePosted}
      </p>
      <div className="news-detail-content">{news.text_content}</div>
    </div>
  );
};

export default NewsPage;
