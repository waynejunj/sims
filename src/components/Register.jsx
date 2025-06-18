import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'

function Register() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('staff');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await axios.post(
        'http://sims21.pythonanywhere.com/register',
        new URLSearchParams({
          username,
          full_name: fullName,
          email,
          role,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-ID': user.user_id || '',
          },
        }
      );

      setSuccess('User registered successfully! A temporary password has been sent to the user\'s email.');
      setTimeout(() => {
        navigate('/users');
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden" 
         style={{
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           animation: 'gradientShift 6s ease infinite'
         }}>
      
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: 1 }}>
        <div className="position-absolute rounded-circle bg-light opacity-10" 
             style={{ 
               width: '300px', 
               height: '300px', 
               top: '-150px', 
               right: '-150px',
               animation: 'float 6s ease-in-out infinite'
             }}></div>
        <div className="position-absolute rounded-circle bg-light opacity-10" 
             style={{ 
               width: '200px', 
               height: '200px', 
               bottom: '-100px', 
               left: '-100px',
               animation: 'float 8s ease-in-out infinite reverse'
             }}></div>
        <div className="position-absolute rounded-circle bg-light opacity-5" 
             style={{ 
               width: '150px', 
               height: '150px', 
               top: '20%', 
               left: '10%',
               animation: 'float 10s ease-in-out infinite'
             }}></div>
      </div>

      <div className="container" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0" 
                 style={{
                   backdropFilter: 'blur(10px)',
                   background: 'rgba(255, 255, 255, 0.95)',
                   borderRadius: '20px',
                   animation: 'slideInUp 0.6s ease-out'
                 }}>
              
              {/* Header with Icon */}
              <div className="card-header text-center border-0 bg-transparent pt-4 pb-2">
                <div className="mb-3">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary shadow-lg"
                       style={{ width: '70px', height: '70px', animation: 'pulse 2s infinite' }}>
                    <i className="fas fa-user-plus text-white" style={{ fontSize: '2rem' }}></i>
                  </div>
                </div>
                <h2 className="card-title mb-0 fw-bold text-primary" style={{ fontSize: '2.2rem' }}>
                  Create New User
                </h2>
                <p className="text-muted mt-2 mb-0">Join our amazing platform today</p>
              </div>

              <div className="card-body px-4 pb-4">
                {/* Alert Messages with Enhanced Styling */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show border-0 shadow-sm" 
                       style={{ animation: 'slideInDown 0.3s ease-out' }} role="alert">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <div className="flex-grow-1">{error}</div>
                      <button type="button" className="btn-close" onClick={() => setError('')}></button>
                    </div>
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success alert-dismissible fade show border-0 shadow-sm" 
                       style={{ animation: 'slideInDown 0.3s ease-out' }} role="alert">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-check-circle me-2 mt-1"></i>
                      <div className="flex-grow-1">
                        <div>{success}</div>
                        <small className="d-block mt-2 opacity-75">
                          The user will receive an email with their temporary password and instructions to change it in their profile.
                        </small>
                      </div>
                      <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleRegister} className="needs-validation" noValidate>
                  <div className="row g-3">
                    {/* Username Field */}
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control border-2 shadow-sm"
                          id="username"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}
                          required
                        />
                        <label htmlFor="username">
                          <i className="fas fa-user me-2 text-primary"></i>Username
                        </label>
                      </div>
                    </div>

                    {/* Full Name Field */}
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control border-2 shadow-sm"
                          id="fullName"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}
                          required
                        />
                        <label htmlFor="fullName">
                          <i className="fas fa-id-card me-2 text-primary"></i>Full Name
                        </label>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control border-2 shadow-sm"
                          id="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}
                          required
                        />
                        <label htmlFor="email">
                          <i className="fas fa-envelope me-2 text-primary"></i>Email Address
                        </label>
                      </div>
                    </div>

                    {/* Role Field */}
                    <div className="col-12">
                      <div className="form-floating mb-4">
                        <select
                          className="form-select border-2 shadow-sm"
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}
                        >
                          <option value="staff">Staff Member</option>
                          <option value="admin">Administrator</option>
                        </select>
                        <label htmlFor="role">
                          <i className="fas fa-user-cog me-2 text-primary"></i>User Role
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary btn-lg w-100 shadow-lg fw-bold ${loading ? 'disabled' : ''}`}
                        style={{
                          borderRadius: '12px',
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          border: 'none',
                          padding: '12px 0',
                          transition: 'all 0.3s ease',
                          transform: loading ? 'scale(0.98)' : 'scale(1)'
                        }}
                      >
                        {loading ? (
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            Creating Account...
                          </div>
                        ) : (
                          <div className="d-flex align-items-center justify-content-center">
                            <i className="fas fa-plus-circle me-2"></i>
                            Create User Account
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Footer Links */}
                <div className="text-center mt-4">
                  <div className="border-top pt-4">
                    <p className="text-muted mb-2">
                      Already have an account?{' '}
                      <a href="/login" className="text-decoration-none fw-bold text-primary">
                        Sign In Here
                      </a>
                    </p>
                    <div className="alert alert-info border-0 bg-light" style={{ borderRadius: '12px' }}>
                      <i className="fas fa-info-circle me-2"></i>
                      <small>
                        <strong>Admin Only:</strong> Only administrators can register new users. 
                        A temporary password will be sent via email.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Font Awesome for Icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    </div>
  );
}

export default Register;