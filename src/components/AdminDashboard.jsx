import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard({ user }) {
  const navigate = useNavigate();

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-primary text-white text-center rounded-top">
          <h2 className="mb-0">Admin Dashboard</h2>
        </div>
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-warning bg-warning-subtle transition-all hover:shadow-md">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-bold">Staff Management</h5>
                  <p className="card-text flex-grow-1">Manage user accounts (add, edit, delete).</p>
                  <Link to="/staff-management" className="btn btn-primary mt-auto">Go to Staff Management</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-warning bg-warning-subtle transition-all hover:shadow-md">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-bold">Equipment Management</h5>
                  <p className="card-text flex-grow-1">Manage surgical instruments and sets.</p>
                  <Link to="/equipment-management" className="btn btn-primary mt-auto">Go to Equipment Management</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;