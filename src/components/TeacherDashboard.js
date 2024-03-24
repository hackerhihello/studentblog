import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [message, setMessage] = useState(null); 
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
    // Handle accepting a blog
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
    </div>
  );
};

export default TeacherDashboard;
