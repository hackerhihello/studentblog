import React, { useState, useEffect } from 'react';

const TeacherDashboard = () => {
  const [pendingBlogs, setPendingBlogs] = useState([]);

  useEffect(() => {
    // Fetch pending blogs for teachers
    // Example API call
    fetch('http://localhost:3000/api/teacher/pending-blogs')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => setPendingBlogs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleAccept = (blogId) => {
    // Update the status of the blog to accepted
    // Example API call
    fetch(`http://localhost:3000/api/teacher/accept-blog/${blogId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'accepted' }),
    })
      .then(response => {
        if (response.ok) {
          // Remove the accepted blog from the pending blogs list
          setPendingBlogs(pendingBlogs.filter(blog => blog.id !== blogId));
        }
      })
      .catch(error => console.error('Error accepting blog:', error));
  };

  const handleReject = (blogId) => {
    // Update the status of the blog to rejected
    // Example API call
    fetch(`http://localhost:3000/api/teacher/reject-blog/${blogId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'rejected' }),
    })
      .then(response => {
        if (response.ok) {
          // Remove the rejected blog from the pending blogs list
          setPendingBlogs(pendingBlogs.filter(blog => blog.id !== blogId));
        }
      })
      .catch(error => console.error('Error rejecting blog:', error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teacher Dashboard</h2>
      <div className="row">
        {pendingBlogs.map(blog => (
          <div key={blog.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content}</p>
                <button onClick={() => handleAccept(blog.id)} className="btn btn-success mr-5">Accept</button>
                <button onClick={() => handleReject(blog.id)} className="btn btn-danger mr-5">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
