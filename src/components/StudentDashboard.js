import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState('');

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
    fetch(`http://localhost:3000/api/student/blogs/${userEmail}`)
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);
  // console.log(blogs);
  return (
    <div className="container">
      <h2 className="mt-4">Student Dashboard</h2>
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
