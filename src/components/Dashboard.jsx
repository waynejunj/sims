import React from 'react';
import Navbar from './Navbar/Navbar';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-vh-100 bg-primary bg-opacity-10">
      <Navbar />
      <div className="container py-5">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-primary fw-bold mb-4">
            Welcome, {user.full_name || 'User'}!
          </h2>
          <p className="text-primary">
            Role: {user.role || 'N/A'}
          </p>
          <p className="text-primary">
            Email: {user.email || 'N/A'}
          </p>
          <div className="mt-4">
            <h4 className="text-primary fw-bold">Quick Actions</h4>
            <div className="d-flex flex-wrap gap-3 mt-3">
              <a href="/profile" className="btn btn-primary">
                View Profile
              </a>
              <a href="/instruments" className="btn btn-primary">
                Manage Instruments
              </a>
              <a href="/sets" className="btn btn-primary">
                Manage Sets
              </a>
              <a href="/scan" className="btn btn-primary">
                Scan Barcode
              </a>
              {user.role === 'admin' && (
                <>
                  <a href="/users" className="btn btn-primary">
                    Manage Users
                  </a>
                  <a href="/register" className="btn btn-primary">
                    Register New User
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;