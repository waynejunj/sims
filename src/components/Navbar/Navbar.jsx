import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Get first initials from username (e.g., "JohnDoe" -> "JD")
  const username = user.username || 'User';
  const initials = username
    ? username
        .split(/[^a-zA-Z]/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2)
    : 'U';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand" href="/dashboard">SIMS21</a>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links and Avatar/Dropdown */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Navigation Links */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/instruments">Instruments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sets">Sets</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/scan">Scan Barcode</a>
            </li>
            {user.role === 'admin' && (
              <li className="nav-item">
                <a className="nav-link" href="/register">Register User</a>
              </li>
            )}
          </ul>

          {/* Right Avatar, Username, and Dropdown */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item dropdown">
              <div
                className="d-flex align-items-center"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                role="button"
              >
                <div className="navbar-avatar">
                  {initials}
                </div>
                <span className="navbar-username">{username}</span>
              </div>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <a className="dropdown-item" href="/profile">
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;