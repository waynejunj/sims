import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar/Navbar';
import './Navbar/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.user_id || '';

  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    username: '',
    role: '',
    avatar: null,
    avatar_mimetype: null,
  });
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Password update state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch profile data on mount
  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://sims21.pythonanywhere.com/profile/${userId}`, {
          headers: { 'User-ID': userId },
        });
        setProfile(response.data);
        setFullName(response.data.full_name || '');
        setEmail(response.data.email || '');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    if (fullName) formData.append('full_name', fullName);
    if (email) formData.append('email', email);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      await axios.put(`http://sims21.pythonanywhere.com/profile/${userId}`, formData, {
        headers: {
          'User-ID': userId,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Profile updated successfully!');
      // Refresh profile data
      const response = await axios.get(`http://sims21.pythonanywhere.com/profile/${userId}`, {
        headers: { 'User-ID': userId },
      });
      setProfile(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://sims21.pythonanywhere.com/profile/${userId}/password`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            'User-ID': userId,
            'Content-Type': 'application/json',
          },
        }
      );

      setPasswordSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !['image/png', 'image/jpeg'].includes(file.type)) {
      setError('Invalid image format. Use PNG or JPEG.');
      setAvatarFile(null);
    } else {
      setAvatarFile(file);
      setError('');
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    document.getElementById('avatar').click();
  };

  // Get initials for avatar placeholder
  const initials = profile.username
    ? profile.username
        .split(/[^a-zA-Z]/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2)
    : 'U';

  return (
    <div className="min-vh-100 bg-primary bg-opacity-10">
      <Navbar />
      <div className="container py-5">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-primary fw-bold mb-4">Profile</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="row">
            {/* Avatar Display */}
            <div className="col-md-4 text-center mb-4">
              <div className="position-relative d-inline-block">
                {profile.avatar ? (
                  <img
                    src={`data:${profile.avatar_mimetype};base64,${profile.avatar}`}
                    alt="Avatar"
                    className="rounded-circle mb-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={triggerFileInput}
                  />
                ) : (
                  <div
                    className="navbar-avatar rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      fontSize: '48px',
                      backgroundColor: '#f0f0f0',
                      cursor: 'pointer'
                    }}
                    onClick={triggerFileInput}
                  >
                    {initials}
                  </div>
                )}
                <div 
                  className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2"
                  style={{ cursor: 'pointer' }}
                  onClick={triggerFileInput}
                >
                  <FontAwesomeIcon icon={faCamera} className="text-white" />
                </div>
              </div>
              <p className="text-primary fw-bold">{profile.username}</p>
              <p className="text-primary">Role: {profile.role || 'N/A'}</p>
              
              {/* Hidden file input */}
              <input
                type="file"
                id="avatar"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
                className="d-none"
              />

              {/* Password update button */}
              <button 
                className="btn btn-outline-primary mt-3"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                {showPasswordForm ? 'Cancel Password Change' : 'Change Password'}
              </button>
            </div>
            
            {/* Profile Form */}
            <div className="col-md-8">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label text-primary">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-control"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-primary">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary w-100 ${loading ? 'disabled' : ''}`}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>

              {/* Password Update Form */}
              {showPasswordForm && (
                <form onSubmit={handlePasswordUpdate} className="mt-4 pt-4 border-top">
                  <h5 className="text-primary mb-3">Change Password</h5>
                  {passwordError && <div className="alert alert-danger">{passwordError}</div>}
                  {passwordSuccess && <div className="alert alert-success">{passwordSuccess}</div>}
                  
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label text-primary">Current Password</label>
                    <div className="input-group">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter current password"
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label text-primary">New Password</label>
                    <div className="input-group">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter new password"
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label text-primary">Confirm New Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-control"
                        placeholder="Confirm new password"
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn btn-primary w-100 ${loading ? 'disabled' : ''}`}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;