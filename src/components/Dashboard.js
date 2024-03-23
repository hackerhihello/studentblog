// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/student" className="btn btn-primary mr-2">Student Dashboard</Link>
      <Link to="/teacher" className="btn btn-primary">Teacher Dashboard</Link>
    </div>
  );
};

export default Dashboard;
