import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch email from session storage
      const email = sessionStorage.getItem('email');
      if (!email) {
        console.error('User is not logged in');
        return;
      }

      // Send a POST request to create a new blog
      const response = await axios.post('http://localhost:3000/api/student/blogs', {
        email,
        title,
        content
      });

      // Check if the blog was created successfully
      if (response.data.message === 'Blog created successfully') {
        // Redirect the user to the StudentDashboard page after successful blog creation
        window.location.href = '/student';
      } else {
        console.error('Error creating blog:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="container">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" rows="4" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
