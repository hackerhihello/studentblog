import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and create a blog
  };

  return (
    <div className="container">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" rows="4" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
