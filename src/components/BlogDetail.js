import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showAdvertisement, setShowAdvertisement] = useState(false); 

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
    if (likedPosts[id]) {
      setLikes(likedPosts[id]);
      setIsLiked(true);
    }
    
    fetch(`http://localhost:5000/api/teacher/accept-blog/${id}`)
      .then(response => response.json())
      .then(data => {
        setBlog(data.acceptedBlog);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });

    const timer = setTimeout(() => {
      setShowAdvertisement(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
    const updatedLikes = likes + 1;
    
    if (isLiked) {
      setLikes(updatedLikes - 1);
      delete likedPosts[id];
    } else {
      setLikes(updatedLikes);
      likedPosts[id] = updatedLikes;
    }
    
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    setIsLiked(!isLiked);
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

  const likeCountStyle = {
    fontWeight: 'bold',
    marginLeft: '5px',
    transition: 'transform 0.15s ease-out',
    cursor: 'pointer'
  };

  return (
    <div className="container">
      <h2 className="card-text mt-4 mb-3 " style={{textAlign: 'center'}}> Student Blog</h2>
    <div className="container" style={{ marginTop: '50px' }}>
    <div className="container mt-4" >
      <div className="row justify-content-center">
        <div className="col-md-8">
          {blog ? (
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">{blog.title}</h3>
                <p className="card-text">{blog.content}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <button 
                      className={`btn btn-outline-primary me-2 ${isLiked ? 'disabled' : ''}`} 
                      onClick={handleLike}
                      disabled={isLiked}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} /> Like
                    </button>
                    <span style={likeCountStyle}>{likes}</span>
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
                <p>Here goes your advertisement content. You can add images, text, or links to promote your products or services.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default BlogDetail;
