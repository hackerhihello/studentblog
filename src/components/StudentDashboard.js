import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = sessionStorage.getItem('email');
    if (!userEmail) {
      console.error('User is not logged in');
      return;
    }
    setEmail(userEmail);

    fetch(`http://localhost:5000/api/student/blogs/${userEmail}`)
      .then(response => response.json())
      .then(data => {
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

  const handleCancelBlogs = () => {
    navigate('/cancel-blogs');
  };

  return (
    <div className="container">
      <h2 className="mt-4">Student Dashboard</h2>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-primary me-2" onClick={handleCreateBlog}>Create Blog</button>
        <button className="btn btn-primary me-2" onClick={handleViewBlogs}>View Blogs</button>
        <button className="btn btn-primary" onClick={handleCancelBlogs}>Cancel Blogs</button>
      </div>
      <div className="row mt-4">
        <div className="col-md-8">
          <ul className="list-group">
            {blogs.map(blog => (
              <li key={blog._id} className="list-group-item">
                <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Advertisement</h5>
              <p className="card-text">Here goes your advertisement content. You can add images, text, or links to promote your products or services.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
