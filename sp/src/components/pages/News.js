import React, { useState, useEffect } from "react";
import "../../styles/News.css";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  if (news.length === 0) {
    return <div className="news-page">Loading news...</div>;
  }

  // Divide news into sections:
  const featured = news[0];
  const sideNews = news.slice(1, 3);
  const gridNews = news.slice(3);

  return (
    <div className="news-page">
      {/* Top Section: Featured and Side News */}
      <section className="news-hero">
        <div className="featured-news">
          <img src={featured.image} alt={featured.title} />
          <div className="overlay">
            <p className="author">{featured.author}</p>
            <p className="date">{featured.date}</p>
            <h2 className="title">{featured.title}</h2>
          </div>
        </div>
        <div className="side-news">
          {sideNews.map((item, index) => (
            <div key={index} className="side-news-card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Bar */}
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

      {/* Grid of News Cards */}
      <div className="news-grid">
        {gridNews.length > 0
          ? gridNews.map((item, index) => (
              <div key={index} className="news-card">
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p className="meta">
                  {item.author}, {item.date} | {item.category}
                </p>
                <p className="description">{item.content}</p>
              </div>
            ))
          : news.map((item, index) => (
              <div key={index} className="news-card">
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p className="meta">
                  {item.author}, {item.date} | {item.category}
                </p>
                <p className="description">{item.content}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default News;
