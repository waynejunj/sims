import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Homepage({ user }) {
  const navigate = useNavigate();

  if (user) {
    navigate(user.role === 'admin' ? '/admin' : '/staff');
    return null;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="card shadow-sm bg-warning-subtle border-warning">
            <div className="card-body">
              <h1 className="card-title mb-4">Welcome to SIMS</h1>
              <p className="card-text mb-4">
                Surgical Instrument Management System helps you track and manage surgical instruments and sets efficiently.
                Log in to access your dashboard.
              </p>
              <Link to="/login" className="btn btn-primary btn-lg">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;