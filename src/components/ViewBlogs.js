import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAdvertisement, setShowAdvertisement] = useState(false);

  useEffect(() => {
   
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        
        const allBlogs = Object.values(response.data).flat();
        setBlogs(allBlogs);
      })
      .catch(error => console.error('Error fetching blogs:', error));

      const timer = setTimeout(() => {
        setShowAdvertisement(true);
      }, 10000);
  
      // Clear timer on unmount to avoid memory leaks
      return () => clearTimeout(timer);

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
}


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
