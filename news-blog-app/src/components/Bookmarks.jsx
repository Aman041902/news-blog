import React from "react";
import "./modal.css";
import demoImg from "../assets/images/demo.jpg";
import "./bookmarks.css";

const Bookmarks = ({ show, bookmarks, onClose, onSelect, onDelete }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-cont">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <h2 className="heading">Bookmarks news</h2>
        <div className="bookmark-news-list">
          {bookmarks.map((item, index) => (
            <div className="item" key={index} onClick={() => setArticle(item)}>
              <img src={item.image || demoImg} alt={item.title} />
              <h3>{item.title}</h3>
              <span
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
