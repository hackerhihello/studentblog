import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to store the selected blog
  const [email, setEmail] = useState('');
  const [showAdvertisement, setShowAdvertisement] = useState(false); // State to control the visibility of the advertisement modal
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

    // Show advertisement after 10 seconds
    const timer = setTimeout(() => {
      setShowAdvertisement(true);
    }, 10000);

    // Clear timer on unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  const handleCreateBlog = () => {
    navigate('/create-blog');
  };

  const handleViewBlogs = () => {
    navigate('/studentview-blogs');
  };

  const handleCancelBlogs = () => {
    navigate('/studentcancel-blogs');
  };

  // Function to handle selecting a blog
  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="container">
      <h2 className="mt-4">Student Dashboard</h2>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-primary me-2" onClick={handleCreateBlog}>Create Blog</button>
        <button className="btn btn-primary me-2" onClick={handleViewBlogs}>Student View Blogs</button>
        <button className="btn btn-primary" onClick={handleCancelBlogs}>Student Cancel Blogs</button>
      </div>
      <div className="row mt-4">
      <div className="col-md-12">
        <div className="list-group">
          {blogs.map(blog => (
            <Link 
              key={blog._id} 
              to={`/blogs/${blog._id}`} 
              className="list-group-item list-group-item-action"
              style={{ 
                backgroundColor: '#f8f9fa', 
                border: '1px solid #dee2e6', 
                borderRadius: '5px', 
                marginBottom: '5px', 
                color: '#212529',
                textDecoration: 'none', 
                transition: 'background-color 0.3s ease', 
              }}
            >
              {blog.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
      {/* Advertisement modal */}
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

export default StudentDashboard;
