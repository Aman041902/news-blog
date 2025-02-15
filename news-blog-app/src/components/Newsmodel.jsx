import React from "react";
import demoImg from "../assets/images/demo.jpg";
import "./newsmodal.css";
import "./modal.css";

const Newsmodel = ({ show, article, onClose }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-cont">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {article && (
          <>
            <img
              src={article.image}
              alt={article.title}
              className="modal-img"
            />
            <h2 className="modal-title">{article.title}</h2>
            <p className="modal-info">Source : {article.source.name}</p>
            <p className="modal-date">
              {new Date(article.publishedAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="modal-text">{article.content}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer noopener"
              className="read-more"
            >
              Explore more
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Newsmodel;
