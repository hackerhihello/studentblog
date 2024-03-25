import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [showAdvertisement, setShowAdvertisement] = useState(false); // State to control the display of the advertisement
  const navigate = useNavigate();

  const fetchPendingBlogs = () => {
    axios.get('http://localhost:5000/api/teacher/pending-blogs')
      .then(response => setPendingBlogs(response.data))
      .catch(error => console.error('Error fetching pending blogs:', error));
  };

  useEffect(() => {
    fetchPendingBlogs();

    const intervalId = setInterval(fetchPendingBlogs, 300000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAccept = (id) => {
    axios.put(`http://localhost:5000/api/teacher/accept-blog/${id}`)
      .then(response => {
        setMessage('Blog accepted successfully');
        setPendingBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
        fetchPendingBlogs();
      })
      .catch(error => {
        console.error('Error accepting blog:', error);
        setMessage('Error accepting blog');
      });
  };

  const handleReject = (id) => {
    axios.put(`http://localhost:5000/api/teacher/reject-blog/${id}`)
      .then(response => {
        setMessage('Blog rejected successfully');
        setPendingBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
        fetchPendingBlogs();
      })
      .catch(error => {
        console.error('Error rejecting blog:', error);
        setMessage('Error rejecting blog');
      });
  };

  const handleViewBlogs = () => {
    navigate('/view-blogs');
  };

  const handleCancelBlogs = () => {
    navigate('/cancel-blogs');
  };

  useEffect(() => {
    // Fetch advertisement content when the component mounts
    const fetchAdvertisementContent = async () => {
      try {
        const timer = setTimeout(() => {
          setShowAdvertisement(true);
        }, 10000);
    
        // Clear timer on unmount to avoid memory leaks
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error fetching advertisement:', error);
      }
    };

    fetchAdvertisementContent();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teacher Dashboard</h2>
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary me-2" onClick={handleViewBlogs}>View Blogs</button>
        <button className="btn btn-primary" onClick={handleCancelBlogs}>Cancel Blogs</button>
      </div>
      {message && <div className="alert alert-success">{message}</div>}
      <div className="list-group">
        {pendingBlogs.map(blog => (
          <div key={blog._id} className="list-group-item mb-3">
            <h5 className="mb-2">{blog.title}</h5>
            <p className="mb-2">{blog.content}</p>
            <div>
              <button className="btn btn-success me-2" onClick={() => handleAccept(blog._id)}>Accept</button>
              <button className="btn btn-danger" onClick={() => handleReject(blog._id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
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

export default TeacherDashboard;
