import React from "react";

const PostQuestion = () => {
  return (
    <div className="main question-page">
      <div>
        <h1>Ask a Public Question</h1>
        <div className="question-form-container">
          <span>
            <label htmlFor="question-title">Title</label>
            <p>
              Be specific and imagine you’re asking a question to another person
            </p>
            <input
              name="title"
              type="text"
              id="question-title"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
          </span>

          <span>
            <label htmlFor="question-body">Body</label>
            <p>
              Include all the information someone would need to answer your
              question
            </p>
            <textarea
              name="body"
              id="question-body"
              cols="30"
              rows="10"
            ></textarea>
          </span>

          <span>
            <label htmlFor="question-tags">Tags</label>
            <p>Add up to 5 tags to describe what your question is about</p>
            <input
              name="tags"
              type="text"
              id="question-tags"
              placeholder="e.g. (java asp.net-mvc windows)"
            />
          </span>
        </div>
        <button className="button">Review your Question</button>
      </div>
    </div>
  );
};

export default PostQuestion;
