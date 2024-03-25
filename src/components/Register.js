import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAdvertisement, setShowAdvertisement] = useState(false); // State to control the display of the advertisement
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', { email, password });
      console.log(res.data); 
      navigate("/login");
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label">Password</label>
                  <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
              <div className="text-center mt-3">
                <p>Already have an account? <button type="button" className="btn btn-link p-0" onClick={handleLoginClick}>Login</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Register;
