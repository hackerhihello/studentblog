import React from 'react';

const BlogList = ({ blogs }) => {
  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Blog List</h2>
      <div className="row">
        {blogs.map(blog => (
          <div key={blog.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
