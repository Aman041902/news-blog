import React from "react";
import blog1 from "../assets/images/blog1.jpg";

import "./blogmodal.css";

const Blogmodal = ({ showblogmodal, blog, closeblog }) => {
  if (!showblogmodal) {
    // conso
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-cont">
        <span className="close-button" onClick={closeblog}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {blog.image && (
          <img src={blog.image} alt={blog.title} className="blogs-modal-img" />
        )}

        <h2 className="blog-modal-title">{blog.title}</h2>
        <p className="blog-modal-cont">{blog.content}</p>
      </div>
    </div>
  );
};

export default Blogmodal;
