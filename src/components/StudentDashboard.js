import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student's email from the session storage
    const userEmail = sessionStorage.getItem('email');
    if (!userEmail) {
      // Handle case where email is not found (user is not logged in)
      console.error('User is not logged in');
      return;
    }
    setEmail(userEmail);

    // Fetch student's blogs based on email from the backend API
    fetch(`http://localhost:5000/api/student/blogs/${userEmail}`)
      .then(response => response.json())
      .then(data => {
        // Filter out the accepted blogs
        const acceptedBlogs = data.filter(blog => blog.status === 'accepted');
        setBlogs(acceptedBlogs);
      })
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);
  
  const handleCreateBlog = () => {
    navigate('/create-blog');
  };
  const handleViewBlogs = () => {
    navigate('/view-blogs');
  };
  const handleCancleBlogs = () => {
    navigate('/cancel-blogs');
  };


  // console.log(blogs);
  return (
    <div className="container">
      <h2 className="mt-4">Student Dashboard</h2>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-primary me-2" onClick={handleCreateBlog}>Create Blog</button>
        <button className="btn btn-primary me-2" onClick={handleViewBlogs}>View Blogs</button>
        <button className="btn btn-primary" onClick={handleCancleBlogs}>Cancel Blogs</button>
      </div>
      <ul className="list-group mt-4">
        {blogs.map(blog => (
          <li key={blog._id} className="list-group-item">
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
