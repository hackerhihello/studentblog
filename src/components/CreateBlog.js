import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAdvertisement, setShowAdvertisement] = useState(false); // State to control the display of the advertisement

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = sessionStorage.getItem('email');
      if (!email) {
        console.error('User is not logged in');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/student/blogs', {
        email,
        title,
        content
      });

      if (response.data.message === 'Blog created successfully') {
        window.location.href = '/student';
      } else {
        console.error('Error creating blog:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
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
    <div className="container">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" rows="4" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Create Blog</button>
      </form>

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

export default CreateBlog;
