const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Use the cors middleware
app.use(cors());

// Example data - pending blogs
let pendingBlogs = [
  { id: 1, title: 'Blog 1', content: 'Content of Blog 1' },
  { id: 2, title: 'Blog 2', content: 'Content of Blog 2' },
];

let acceptedBlogs = [
    { id: 3, title: 'Accepted Blog 1', content: 'Content of Accepted Blog 1' },
    { id: 4, title: 'Accepted Blog 2', content: 'Content of Accepted Blog 2' },
  ]; // Initialize empty array for accepted blogs

  let rejectedBlogs = [
    { id: 5, title: 'reject Blog 1', content: 'Content of reject Blog 1' },
    { id: 6, title: 'reject Blog 2', content: 'Content of reject Blog 2' },
  ]; 
// Route to get pending blogs
app.get('/api/teacher/pending-blogs', (req, res) => {
  res.json(pendingBlogs);
});

// Route to accept a blog
app.post('/api/teacher/accept-blog/:id', (req, res) => {
  const { id } = req.params;
  // Find the blog by id in pending blogs
  const blogIndex = pendingBlogs.findIndex(blog => blog.id == id);
  if (blogIndex !== -1) {
    // Remove the blog from pending blogs and move to accepted blogs
    const acceptedBlog = pendingBlogs.splice(blogIndex, 1)[0];
    acceptedBlogs.push(acceptedBlog);
    res.json(acceptedBlog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
});

// Route to reject a blog
app.post('/api/teacher/reject-blog/:id', (req, res) => {
    const { id } = req.params;
    // Find the blog by id
    const blogIndex = pendingBlogs.findIndex(blog => blog.id == id);
    if (blogIndex !== -1) {
      // Remove the blog from pending blogs and move to rejected blogs
      const rejectedBlog = pendingBlogs.splice(blogIndex, 1)[0];
      rejectedBlogs.push(rejectedBlog);
      res.json(rejectedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  });

// Route to get accepted blogs for students
app.get('/api/student/blogs', (req, res) => {
  res.json(acceptedBlogs);
});

// Route to get accepted blogs for students based on ID
app.get('/api/student/blogs/:id', (req, res) => {
    const { id } = req.params;
    const blog = acceptedBlogs.find(blog => blog.id === parseInt(id));
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
