import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CancelBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAdvertisement, setShowAdvertisement] = useState(false); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/rejectblogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
    
    
        const timer = setTimeout(() => {
          setShowAdvertisement(true);
        }, 10000);
    
        // Clear timer on unmount to avoid memory leaks
        return () => clearTimeout(timer);
  
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

      {/* Modal to display the advertisement */}
      {showAdvertisement && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Advertisement</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowAdvertisement(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Here goes your advertisement content. You can add images, text, or links to promote your products or services.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
