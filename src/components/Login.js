import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('');

  const handleLogin = (type) => {
    setUserType(type);
  };

  return (
    <div className="container mt-5">
     <h2 className="mb-4 text-center">Login Page</h2>

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mx-2" onClick={() => handleLogin('student')}>Student Login</button>
        <button className="btn btn-primary mx-2" onClick={() => handleLogin('teacher')}>Teacher Login</button>
      </div>
      {userType === 'student' && (
        <div className="mt-4">
          <p className="mb-2">Welcome, Student!</p>
          <Link className="btn btn-success" to="/student">Go to Student Dashboard</Link>
        </div>
      )}
      {userType === 'teacher' && (
        <div className="mt-4">
          <p className="mb-2">Welcome, Teacher!</p>
          <Link className="btn btn-success" to="/teacher">Go to Teacher Dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default Login;
