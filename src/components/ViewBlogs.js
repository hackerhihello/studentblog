import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch all blogs
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        // Combine all blogs from different status categories into one array
        const allBlogs = Object.values(response.data).flat();
        setBlogs(allBlogs);
      })
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">All Blogs</h2>
      <ul className="list-group">
        {blogs.map(blog => (
          <li key={blog._id} className="list-group-item border-0 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/blogs/${blog._id}`} className="text-decoration-none">
                <h5 className="mb-0">{blog.title}</h5>
              </Link>
              <span className={`badge ${getStatusColor(blog.status)}`}>{blog.status}</span>
            </div>
            <p className="mb-0">{blog.content}</p>
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

export default ViewBlogs;
