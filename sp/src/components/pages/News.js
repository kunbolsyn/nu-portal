import React, { useState, useEffect } from "react";
import "../../styles/News.css";
import "../../styles/NewsCards.css";
import NewsDetail from "./NewsDetail";

const News = () => {
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data))
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
          onClick={() => setSelected(featured)}
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
              onClick={() => setSelected(item)}
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
      <div className="news-filters">
        <input type="text" placeholder="Search..." />
        <select>
          <option value="">All Categories</option>
          <option value="Articles">Articles</option>
          <option value="Community">Community</option>
          <option value="Notices">Notices</option>
        </select>
        <button>Filter</button>
      </div>

      <div className="news-grid">
        {news.map((item, index) => (
          <div
            key={index}
            className="news-card"
            onClick={() => setSelected(item)}
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

      {/* Detail Overlay */}
      <NewsDetail item={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default News;
