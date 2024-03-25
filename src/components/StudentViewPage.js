import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentViewPage = () => {
  const [acceptedBlogs, setAcceptedBlogs] = useState([]);
  const [showAdvertisement, setShowAdvertisement] = useState(false); // State to control the visibility of the advertisement popup
  const userEmail = sessionStorage.getItem('email');

  useEffect(() => {
    if (!userEmail) {
      console.error('User is not logged in');
      return;
    }

    const fetchAcceptedBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/accepted-blogs/${userEmail}`);
        setAcceptedBlogs(response.data);
      } catch (error) {
        console.error('Error fetching accepted blogs:', error);
      }
    };

    fetchAcceptedBlogs();

    // Show advertisement after 10 seconds
    const timer = setTimeout(() => {
      setShowAdvertisement(true);
    }, 10000);

    // Clear timer on component unmount
    return () => clearTimeout(timer);
  }, [userEmail]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Your Accepted Blogs</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {acceptedBlogs.map(blog => (
          <div key={blog._id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content}</p>
                <p className="card-text" style={{color: 'green'}}>{blog.status}</p>
                <Link to={`/blogs/${blog._id}`} className="btn btn-primary">Read More</Link>
              </div>
            </div>
          </div>
        ))}
        {acceptedBlogs.length === 0 && (
          <div className="col">
            <div className="card h-100">
              <div className="card-body text-center">
                <p className="card-text">You haven't written any blogs yet.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Advertisement popup */}
      {showAdvertisement && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Advertisement</h5>
                <button type="button" className="close" aria-label="Close" onClick={() => setShowAdvertisement(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Add your advertisement content here */}
                <p>Here goes your advertisement content. You can add images, text, or links to promote your products or services.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentViewPage;
