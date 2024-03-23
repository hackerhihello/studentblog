import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogDetail from './BlogDetail';

const StudentDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null); 

  useEffect(() => {
    // Fetch blogs for students
    // Example API call
    fetch('http://localhost:3000/api/student/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data));
  }, []);

  const handleBlogClick = (id) => {
    setSelectedBlogId(id); // Update selectedBlogId with the clicked blog's id
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Student Dashboard</h2>
      <ul className="list-group mb-4">
        {blogs.map(blog => (
          <li key={blog.id} className="list-group-item">
            <Link to="#" className="text-decoration-none" onClick={() => handleBlogClick(blog.id)}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      {selectedBlogId && <BlogDetail id={selectedBlogId} />} {/* Pass selectedBlogId as id prop */}
      {!selectedBlogId && <p className="text-muted">Please wait for the teacher's response to view the blog.</p>}
    </div>
  );
};

export default StudentDashboard;
