import React, { useEffect } from "react";
import Weather from "./Weather";
import Calender from "./Calender";
import "./news.css";
import userImg from "../assets/images/user.jpg";
import add from "../assets/images/add.png";
import axios from "axios";
import { useState } from "react";
import noImg from "../assets/images/no-img.png";
import Newsmodel from "./Newsmodel";
import Bookmarks from "./Bookmarks";
import Blogmodal from "./Blogmodal";

const categories = [
  "general",
  "world",
  "entertainment",
  "sports",
  "technology",
  "science",
  "wealth",
  "country",
];

const News = ({ onShowBlogs, blogs, editblog, delblog }) => {
  const [headline, setheadline] = useState(null);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [searchval, setSearchval] = useState("");
  const [show, setShow] = useState(false);
  const [selectedarticle, setArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showbookmarks, setShowbookmarks] = useState(false);
  const [selectedblog, setselectedblog] = useState(null);
  const [showblogmodal, setshowblogmodal] = useState(false);

  useEffect(() => {
    const fetchnews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=d353f75940d5f21ef7964a93e969ae23`;

      if (category === "country") {
        url = `https://gnews.io/api/v4/top-headlines?category=in&lang=en&apikey=d353f75940d5f21ef7964a93e969ae23`;
      }

      if (searchval) {
        url = `https://gnews.io/api/v4/search?q=${searchval}&lang=en&apikey=d353f75940d5f21ef7964a93e969ae23`;
      }

      const response = await axios.get(url);
      const newsdata = response.data.articles;

      setheadline(newsdata[0]);
      console.log(headline);
      setNews(newsdata.slice(1, 7));
      console.log(news);
      const savedbookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarks(savedbookmarks);
    };
    fetchnews();
  }, [category, searchval]);

  const selcategories = (e, category) => {
    e.preventDefault();
    setCategory(category);
  };

  const handlesearch = (e) => {
    e.preventDefault();
    setSearchval(search);
    setSearch("");
  };

  const articleClick = (article) => {
    console.log(article.title);
    setArticle(article);
    setShow(true);
  };

  const handlebookmark = (article) => {
    setBookmarks((prev) => {
      const bookmark = prev.find((item) => item.title === article.title)
        ? prev.filter((item) => item.title !== article.title)
        : [...prev, article];

      localStorage.setItem("bookmarks", JSON.stringify(bookmark));

      return bookmark;
    });
  };

  const handleblog = (blog) => {
    console.log("handleblog");
    setselectedblog(blog);
    setshowblogmodal(true);
    console.log(selectedblog, showblogmodal);
  };

  const closeblog = () => {
    setshowblogmodal(false);
    setselectedblog(null);
  };
  return (
    <div className="news">
      <header className="news-head">
        <h1 className="title">News & Blogs</h1>
        <div className="search">
          <form action="" onSubmit={handlesearch}>
            <input
              type="text"
              placeholder="search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-cont">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={add} alt="aman" />
            <p>Add Blog</p>
          </div>
          <nav className="categories">
            <h2 className="nav-heading">Categories</h2>

            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => selcategories(e, category)}
                  key={category}
                >
                  {category}
                </a>
              ))}
              <a
                href="#"
                className="nav-link"
                onClick={() => setShowbookmarks(true)}
              >
                Saved Articles <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>

        <div className="news-section">
          {headline && (
            <div className="headline" onClick={() => articleClick(headline)}>
              <img src={headline.image || noImg} alt="img" />
              <h2 className="news-title">
                {headline.title}
                <i
                  className={`${
                    bookmarks.some((item) => item.title === headline.title)
                      ? "fa-solid fa-bookmark"
                      : "fa-regular fa-bookmark"
                  } bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlebookmark(headline);
                  }}
                ></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => {
              return (
                <div
                  className="news-list"
                  key={index}
                  onClick={() => articleClick(article)}
                >
                  <img src={article.image || noImg} alt={article.title} />

                  <h3>{article.title}</h3>
                  <i
                    className={`${
                      bookmarks.some((item) => item.title === article.title)
                        ? "fa-solid fa-bookmark"
                        : "fa-regular fa-bookmark"
                    } bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlebookmark(article);
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
        </div>
        <Newsmodel
          show={show}
          article={selectedarticle}
          onClose={() => setShow(false)}
        ></Newsmodel>
        <Bookmarks
          show={showbookmarks}
          bookmarks={bookmarks}
          onClose={() => setShowbookmarks(false)}
          onSelect={handlebookmark}
          onDelete={handlebookmark}
        ></Bookmarks>
        <div className="my-blogs">
          <h1 className="my-blogs-head">My-blogs</h1>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div
                className="blog-item"
                key={index}
                onClick={() => handleblog(blog)}
              >
                <img src={blog.image || noImg} alt="blog" />
                <h3>{blog.title}</h3>
                <div className="blog-btns">
                  <button className="edit-blog" onClick={() => editblog(blog)}>
                    <i className="bx bxs-edit"></i>
                  </button>

                  <button
                    className="del-blog"
                    onClick={(e) => {
                      e.stopPropagation();
                      delblog(blog);
                    }}
                  >
                    <i className="bx bxs-x-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedblog != null && showblogmodal && (
            <Blogmodal
              showblogmodal={showblogmodal}
              blog={selectedblog}
              closeblog={closeblog}
            ></Blogmodal>
          )}
        </div>
        <div className="weather-calender">
          <Weather></Weather>
          <Calender></Calender>
        </div>
      </div>
      <div className="news-footer">
        <p>News & Blogs App</p>
        <p>© 2025 All Rights Reserved</p>
      </div>
    </div>
  );
};

export default News;
