import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [pendingBlogs, setPendingBlogs] = useState([]);

  useEffect(() => {
    // Fetch pending blogs for teacher
    axios.get('http://localhost:3000/api/teacher/pending-blogs')
      .then(response => setPendingBlogs(response.data))
      .catch(error => console.error('Error fetching pending blogs:', error));
  }, []);

  const handleAccept = (id) => {
    // Handle accepting a blog
    axios.put(`http://localhost:3000/api/teacher/accept-blog/${id}`)
      .then(response => {
        console.log(response.data);
        // Remove the accepted blog from the list
        setPendingBlogs(pendingBlogs.filter(blog => blog.id !== id));
      })
      .catch(error => console.error('Error accepting blog:', error));
  };
  
  const handleReject = (id) => {
    // Handle rejecting a blog
    axios.put(`http://localhost:3000/api/teacher/reject-blog/${id}`)
      .then(response => {
        console.log(response.data);
        // Remove the rejected blog from the list
        setPendingBlogs(pendingBlogs.filter(blog => blog.id !== id));
      })
      .catch(error => console.error('Error rejecting blog:', error));
  };
  
  return (
    <div className="container">
      <h2>Teacher Dashboard</h2>
      <ul className="list-group">
        {pendingBlogs.map(blog => (
          <li key={blog.id} className="list-group-item">
            <h5>{blog.title}</h5>
            <p>{blog.content}</p>
            <button className="btn btn-success me-2" onClick={() => handleAccept(blog._id)}>Accept</button>
            <button className="btn btn-danger" onClick={() => handleReject(blog._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
