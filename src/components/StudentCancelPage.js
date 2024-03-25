import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentCancelPage = () => {
  const [rejectedBlogs, setRejectedBlogs] = useState([]);
  const userEmail = sessionStorage.getItem('email');

  useEffect(() => {
    if (!userEmail) {
      console.error('User is not logged in');
      return;
    }

    const fetchRejectedBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rejected-blogs/${userEmail}`);
        setRejectedBlogs(response.data);
      } catch (error) {
        console.error('Error fetching rejected blogs:', error);
      }
    };

    fetchRejectedBlogs();
  }, [userEmail]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Your Rejected Blogs</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {rejectedBlogs.map(blog => (
          <div key={blog._id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content}</p>
                <p className="card-text" style={{color: 'red'}}>{blog.status}</p>
                {/* <Link to={`/blogs/${blog._id}`} className="btn btn-primary">Read More</Link> */}
              </div>
            </div>
          </div>
        ))}
        {rejectedBlogs.length === 0 && (
          <div className="col">
            <div className="card h-100">
              <div className="card-body text-center">
                <p className="card-text">You haven't had any blogs rejected yet.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCancelPage;
