import { useEffect, useState } from "react";
import News from "./components/News";
import Blogs from "./components/Blogs";

function App() {
  const [shownews, setshownews] = useState(true);
  const [showblogs, setshowblogs] = useState(false);
  const [blogs, setblogs] = useState([]);
  const [selectedpost, setselectedpost] = useState(null);
  const [editpost, seteditpost] = useState(false);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setblogs(JSON.parse(storedBlogs)); // Convert string to array
    }
  }, []);

  const addBlog = (newBlog, editpost) => {
    setblogs((prevBlogs) => {
      const updatedBlog = editpost
        ? prevBlogs.map((blog) => (blog === selectedpost ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlog));
      return updatedBlog;
    });

    seteditpost(false);
    setselectedpost(null);
  };

  const handleeditpost = (blog) => {
    seteditpost(true);
    setselectedpost(blog);
    setshownews(false);
    setshowblogs(true);
  };
  const handleblogs = () => {
    setshownews(false);
    setshowblogs(true);
  };

  const delblog = (blog) => {
    setblogs((prevblogs) => {
      const totalblogs = prevblogs.filter((b) => b !== blog);
      localStorage.setItem("blogs", JSON.stringify(totalblogs));
      return totalblogs;
    });
  };

  const handleNews = () => {
    setshownews(true);
    setshowblogs(false);
    seteditpost(false);
    setselectedpost(null);
  };
  return (
    <div className="cont">
      <div className="news-blogs-app">
        {shownews && (
          <News
            onShowBlogs={handleblogs}
            blogs={blogs}
            editblog={handleeditpost}
            delblog={delblog}
          />
        )}
        {showblogs && (
          <Blogs
            onback={handleNews}
            addBlog={addBlog}
            editblog={editpost}
            selectedpost={selectedpost}
          />
        )}
      </div>
    </div>
  );
}

export default App;
