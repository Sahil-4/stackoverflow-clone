import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Tags = () => {
  const Tag = () => {
    return (
      <div className="tag">
        <Link to="question/tags=python">
          <h4>Python</h4>
        </Link>
        <div>
          <p>
            Python is a multi-paradigm, dynamically typed, multi-purpose
            programming language. It is designed to be quick to learn,
            understand, and use, and enforces a clean and uniform syntax...
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="main tags-page">
      <Sidebar />
      <div className="tags-container">
        <div>
          <h1>Tags</h1>
          <p>
            A tag is a keyword or label that categorizes your question with
            other, similar questions. Using the right tags makes it easier for
            others to find and answer your question.
          </p>
        </div>
        <div className="all-tags">
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
        </div>
      </div>
    </div>
  );
};

export default Tags;
