import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this import
import "../../styles/News.css";

const News = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate(); // ✅ Use navigate

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://senior-project-java-backend.onrender.com/api/news/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news");
        return res.json();
      })
      .then((data) => {
        const transformed = data.map((item) => ({
          id: item.news_id,
          title: item.newsTitle,
          author: item.author || "Unknown",
          date: item.newsDatePosted,
          content: item.text_content,
          image:
            item.photos.length > 0
              ? item.photos[0].filePath
              : "images/default-news.jpg",
        }));
        setNews(transformed);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  if (news.length === 0) {
    return <div className="news-page">Loading news...</div>;
  }

  const featured = news[0];
  const sideNews = news.slice(1, 3);

  return (
    <div className="news-page">
      <section className="news-hero">
        <div
          className="featured-news"
          onClick={() => navigate(`/news/${featured.id}`)} // ✅ Navigate to new page
          style={{ cursor: "pointer" }}
        >
          <img src={featured.image} alt={featured.title} />
          <div className="overlay">
            <p className="author">
              <i className="fas fa-user"></i> {featured.author}
            </p>
            <p className="date">
              <i className="fas fa-calendar-alt"></i> {featured.date}
            </p>
            <h2 className="title">{featured.title}</h2>
          </div>
        </div>

        <div className="side-news">
          {sideNews.map((item, index) => (
            <div
              key={index}
              className="side-news-card"
              onClick={() => navigate(`/news/${item.id}`)} // ✅ Navigate
              style={{ cursor: "pointer" }}
            >
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <div className="section-header">
        <i className="fas fa-newspaper"></i>
        <h3>University News</h3>
      </div>

      <div className="news-grid">
        {news.map((item) => (
          <div
            key={item.id}
            className="news-card"
            onClick={() => navigate(`/news/${item.id}`)} // ✅ Navigate
            style={{ cursor: "pointer" }}
          >
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <div className="meta">
              <p>
                <i className="fas fa-user"></i> {item.author}
              </p>
              <p>
                <i className="fas fa-calendar-alt"></i> {item.date}
              </p>
            </div>
            <p className="description">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
