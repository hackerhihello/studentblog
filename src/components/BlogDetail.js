import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/teacher/accept-blog/${id}`)
      .then(response => response.json())
      .then(data => {
        setBlog(data.acceptedBlog);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.content,
        url: window.location.href
      }).then(() => {
        console.log('Blog shared successfully');
      }).catch(error => {
        console.error('Error sharing blog:', error);
      });
    } else {
      console.log('Share API not supported');
    }
  };
  
  return (
    <div className="container mt-4">
      {blog ? (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{blog.title}</h3>
            <p className="card-text">{blog.content}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button className="btn btn-outline-primary me-2" onClick={handleLike}>
                  <FontAwesomeIcon icon={faThumbsUp} /> Like
                </button>
                <span>{likes} Likes</span>
              </div>
              <button className="btn btn-outline-secondary" onClick={handleShare}>
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetail;
