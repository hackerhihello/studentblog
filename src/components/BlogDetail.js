import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'; // Import the thumbs-up icon

const BlogDetail = ({ id }) => {
  // Fetch blog details using the id
  // Example API call
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0); // State to track the number of likes

  useEffect(() => {
    // Fetch blog by ID
    fetch(`http://localhost:3000/api/student/blogs/${id}`)
      .then(response => response.json())
      .then(data => {
        // Handle the retrieved blog data
        setBlog(data); // Update state with retrieved blog data
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching blog:', error);
      });
  }, [id]);

  // Function to handle the like button click
  const handleLike = () => {
    // Increment the likes count
    setLikes(likes + 1);
    // You can also send a request to the server to update the likes count in the database
  };

  return (
    <div className="container">
      <h4 className="mt-4">Blog Detail</h4>
      {blog && (
        <div className="card mt-4">
          <div className="card-body">
            <h3 className="card-title">{blog.title}</h3>
            <p className="card-text">{blog.content}</p>
            <button className="btn btn-primary" onClick={handleLike}>
              <FontAwesomeIcon icon={faThumbsUp} /> Like
            </button>
            <span className="ml-2">{likes} Likes</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
