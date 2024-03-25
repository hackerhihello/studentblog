import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import CreateBlog from './components/CreateBlog';
import ViewBlogs from './components/ViewBlogs';
import BlogDetail from './components/BlogDetail';
import Register from './components/Register';
import CancelBlogs from './components/CancelBlogs';
import StudentViewPage from './components/StudentViewPage';
import StudentCancelPage from './components/StudentCancelPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/view-blogs" element={<ViewBlogs />} />
        <Route path="/studentview-blogs" element={<StudentViewPage />} />
        <Route path="/studentcancel-blogs" element={<StudentCancelPage />} />
        <Route path="/cancel-blogs" element={<CancelBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
