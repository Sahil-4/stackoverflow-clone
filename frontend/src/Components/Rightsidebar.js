import React from "react";
import { Link } from "react-router-dom";
import Pen from "../assets/pen-solid.svg";
import Comment from "../assets/comment-alt-solid.svg";

const Rightsidebar = () => {
  const tags = [
    "c",
    "c++",
    "css",
    "express",
    "firebase",
    "html",
    "java",
    "javascript",
    "mern",
    "mongodb",
    "mysql",
    "next.js",
    "node.js",
    "php",
    "python",
    "reactjs",
  ];

  return (
    <aside className="sidebar-right">
      <div className="hot-topics">
        <div>
          <h4>The Overflow Blog</h4>
          <ol>
            <li>
              <img src={Pen} alt="" />
              <Link to="/">
                <span>
                  Five nines uptime without developer burnout (Ep. 488)
                </span>
              </Link>
            </li>
            <li>
              <img src={Pen} alt="" />
              <Link to="/">
                <span>
                  We hate Scrum and Agile when it's done wrong (Ep. 489)
                </span>
              </Link>
            </li>
          </ol>
        </div>

        <div>
          <h4>Featured on Meta</h4>
          <ol>
            <li>
              <img src={Comment} alt="" />
              <Link to="/">
                <span>
                  Recent Color Contrast Changes and Accessibility Updates
                </span>
              </Link>
            </li>
            <li>
              <img src={Comment} alt="" />
              <Link to="/">
                <span>
                  Reviewer overboard! Or a request to improve the onboarding
                  guidance for new...
                </span>
              </Link>
            </li>
            <li>
              <img src={Comment} alt="" />
              <Link to="/">
                <span>Should I explain other people's code-only answers?</span>
              </Link>
            </li>
          </ol>
        </div>

        <div>
          <h4>Hot Meta Posts</h4>
          <ol>
            <li>
              <Link to="/">
                <span>
                  Question does not make sense anymore since software update.
                </span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <span>
                  How to handle suggested edits about hyperlink formatting?
                </span>
              </Link>
            </li>
          </ol>
        </div>
      </div>

      <div className="watched-tags">
        <h4>Watched tags</h4>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <Link to={`/questions/tag==${tag}`}>
              <span key={index}>{tag}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Rightsidebar;
