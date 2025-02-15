import React, { useEffect } from "react";
import user from "../assets/images/user.jpg";
import "./blogs.css";
import { useState } from "react";

const Blogs = ({ onback, addBlog, editblog, selectedpost }) => {
  const [showform, setshowform] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setsubmitted] = useState(false);
  const [titlevalid, setTitlevalid] = useState(true);
  const [contentvalid, setContentvalid] = useState(true);

  useEffect(() => {
    if (selectedpost && editblog) {
      setImage(selectedpost.image);
      setTitle(selectedpost.title);
      setContent(selectedpost.content);
      setshowform(true);
    } else {
      setImage(null);
      setTitle("");
      setContent("");
      setshowform(false);
    }
  }, [selectedpost, editblog]);

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const maxsize = 1 * 1024 * 1024;
      if (e.target.files[0].size > maxsize) {
        alert("Image size should not exceed 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitlevalid(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentvalid(true);
  };

  const submitdata = (e) => {
    e.preventDefault();
    if (!title || !content) {
      if (!title) {
        setTitlevalid(false);
      }
      if (!content) {
        setContentvalid(false);
      }
      return;
    }
    const blog = {
      image,
      title,
      content,
    };
    addBlog(blog, editblog);
    setImage(null);
    setTitle("");
    setContent("");
    setshowform(false);
    setsubmitted(true);
    setTimeout(() => {
      setsubmitted(false);
      onback();
    }, 3000);
  };

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={user} alt="img" />
      </div>

      <div className="blogs-right">
        {!showform && !submitted && (
          <button className="post-btn" onClick={() => setshowform(true)}>
            Create a new post
          </button>
        )}

        {submitted && (
          <p className="submitted-post">Post submitted successfully</p>
        )}
        <div className={`blogs-form ${showform ? "visible" : "hidden"}`}>
          <h1>{editblog ? "Edit blog" : "Create a new blog"}</h1>
          <form action="" onSubmit={submitdata}>
            <div className="image-up">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i>
                upload image
              </label>
              <input type="file" id="file-upload" onChange={handleImage} />
            </div>

            <input
              type="text"
              placeholder="Title {Max 50 characters}"
              className={`title-input ${!titlevalid ? "invalid" : ""}`}
              value={title}
              onChange={handleTitleChange}
              maxLength={50}
            />
            <textarea
              name=""
              className={`text-input ${!contentvalid ? "invalid" : ""}`}
              id=""
              placeholder="Write your blog"
              value={content}
              onChange={handleContentChange}
            ></textarea>

            <button className="submit-btn" type="submit">
              {editblog ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        <button className="close-btn" onClick={onback}>
          Back
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
