import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CancelBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch all blogs
    axios.get('http://localhost:5000/api/rejectblogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Cancel Blogs</h2>
      <ul className="list-group">
        {blogs.map(blog => (
          <li key={blog._id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/blogs/${blog._id}`} className="text-decoration-none">
              {blog.title}
            </Link>
            <span className={`badge ${getStatusColor(blog.status)}`}>{blog.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
        }

  // Function to get Bootstrap badge color based on blog status
const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'accepted':
        return 'bg-success';
      case 'rejected':
        return 'bg-danger';
      case 'canceled':
        return 'bg-secondary';
      default:
        return 'bg-primary';
    }
    
};


export default CancelBlogs;
