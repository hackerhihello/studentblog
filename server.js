// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentBlogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// MongoDB Connection
// const mongoURI = 'mongodb://localhost:27017/studentBlogDB';
// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('MongoDB Connected');
// }).catch(err => console.log(err));

// Define student schema
const studentSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

// Define blog schema
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  status: { type: String, default: 'pending' }, // Status can be 'pending', 'accepted', 'rejected'
});

// Create models
const Student = mongoose.model('Student', studentSchema);
const Blog = mongoose.model('Blog', blogSchema);

// Routes
// Student registration
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new student
    const student = new Student({ email, password: hashedPassword });
    await student.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    if (await bcrypt.compare(password, student.password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create blog
app.post('/api/student/blogs', async (req, res) => {
  const { email, title, content } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const blog = new Blog({ title, content });
    await blog.save();
    student.blogs.push(blog);
    await student.save();
    res.json({ message: 'Blog created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch blogs for a student
app.get('/api/student/blogs/:email', async (req, res) => {
  const { email } = req.params;
  try {
    // Find the student by email
    const student = await Student.findOne({ email }).populate('blogs');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return the blogs associated with the student
    res.json(student.blogs);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch pending blogs for teacher
app.get('/api/teacher/pending-blogs', async (req, res) => {
  try {
    const pendingBlogs = await Blog.find({ status: 'pending' });
    res.json(pendingBlogs);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Accept blog
app.put('/api/teacher/accept-blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { status: 'accepted' });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog accepted successfully' });
  } catch (error) {
    console.error('Error accepting blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get a specific accepted blog by ID
app.get('/api/teacher/accept-blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the accepted blog by its ID
    const acceptedBlog = await Blog.findById(id);

    // Check if the accepted blog exists
    if (!acceptedBlog) {
      // If the blog is not found, return a 404 response
      return res.status(404).json({ message: 'Accepted blog not found' });
    }

    // If the accepted blog is found, send it as a response
    res.json({ acceptedBlog });
  } catch (error) {
    // If an error occurs during the process, log the error and send a 500 response
    console.error('Error fetching accepted blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Reject blog
app.put('/api/teacher/reject-blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { status: 'rejected' });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog rejected successfully' });
  } catch (error) {
    console.error('Error rejecting blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Cancel blog (by student)
app.put('/api/student/cancel-blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { status: 'canceled' });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog canceled successfully' });
  } catch (error) {
    console.error('Error canceling blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch blogs with status 'rejected'
app.get('/api/rejectblogs', async (req, res) => {
  try {
    const rejectedBlogs = await Blog.find({ status: 'rejected' });
    res.json(rejectedBlogs);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }    
});

// Fetch pending and accepted blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const pendingBlogs = await Blog.find({ status: 'pending' });
    const acceptedBlogs = await Blog.find({ status: 'accepted' });
    const blogs = { pending: pendingBlogs, accepted: acceptedBlogs };
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }    
});



// Fetch all blogs
// app.get('/api/blogs', async (req, res) => {
//   try {
//     const allBlogs = await Blog.find();
//     res.json(allBlogs);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Fetch pending blogs for a specific student (by email)
app.get('/api/pending-blogs/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const student = await Student.findOne({ email }).populate({
      path: 'blogs',
      match: { status: 'pending' }, // Filter blogs by status
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student.blogs);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch accepted blogs for a specific student (by email)
app.get('/api/accepted-blogs/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const student = await Student.findOne({ email }).populate({
      path: 'blogs',
      match: { status: 'accepted' }, // Filter blogs by status
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student.blogs);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch rejected blogs for a specific student (by email)
app.get('/api/rejected-blogs/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const student = await Student.findOne({ email }).populate({
      path: 'blogs',
      match: { status: 'rejected' }, // Filter blogs by status
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student.blogs);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
