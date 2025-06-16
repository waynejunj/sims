import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile({ user }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (fullName) formData.append('full_name', fullName);
    if (email) formData.append('email', email);
    if (avatar) formData.append('avatar', avatar);

    try {
      const response = await fetch(`http://sims21.pythonanywhere.com/profile/${user.user_id}`, {
        method: 'PUT',
        headers: { 'User-ID': localStorage.getItem('userId') },
        body: formData,
      });
      const data = await response.json();
      setAlert({ show: true, message: data.message, type: response.ok ? 'success' : 'danger' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
    } catch (error) {
      setAlert({ show: true, message: 'Error updating profile', type: 'danger' });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
    }
  };

  if (!user) return <div className="alert alert-warning m-5 rounded-pill">Please log in</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-header bg-primary text-white text-center rounded-top">
              <h3 className="mb-0">User Profile</h3>
            </div>
            <div className="card-body p-4 text-center">
              <img
                src={user.avatar ? `data:${user.avatar_mimetype};base64,${user.avatar}` : 'https://via.placeholder.com/100'}
                alt="Avatar"
                className="rounded-circle mb-3 border border-primary"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <h4 className="card-title text-primary fw-bold">{user.full_name}</h4>
              <p className="text-muted">{user.email}</p>
              {alert.show && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                  {alert.message}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAlert({ show: false, message: '', type: '' })}
                  ></button>
                </div>
              )}
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="fullName"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="avatar" className="form-label fw-bold">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    id="avatar"
                    accept="image/png,image/jpeg"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100 rounded-pill">Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;