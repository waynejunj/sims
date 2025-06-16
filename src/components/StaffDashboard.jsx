import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function StaffDashboard({ user }) {
  const [sets, setSets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await fetch('http://sims21.pythonanywhere.com/sets', {
          headers: { 'User-ID': localStorage.getItem('userId') },
        });
        const data = await response.json();
        setSets(data);
      } catch (error) {
        console.error('Error fetching sets:', error);
      }
    };
    fetchSets();
  }, []);

  if (!user || user.role !== 'staff') {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Staff Dashboard</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm bg-warning-subtle border-warning">
            <div className="card-body">
              <h5 className="card-title">Scan Barcode</h5>
              <p className="card-text">Scan instrument or set barcodes.</p>
              <Link to="/scan" className="btn btn-primary">Go to Scanner</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm bg-warning-subtle border-warning">
            <div className="card-body">
              <h5 className="card-title">Upload Summary</h5>
              <p className="card-text">Submit set item counts.</p>
              <Link to="/upload-summary" className="btn btn-primary">Go to Upload</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm bg-warning-subtle border-warning">
            <div className="card-body">
              <h5 className="card-title">View Profile</h5>
              <p className="card-text">Update your profile details.</p>
              <Link to="/profile" className="btn btn-primary">Go to Profile</Link>
            </div>
          </div>
        </div>
      </div>
      <h5>Sets</h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Barcode</th>
              <th>Status</th>
              <th>Location</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {sets.map((s) => (
              <tr key={s.set_id}>
                <td>{s.name}</td>
                <td>{s.barcode}</td>
                <td>{s.status}</td>
                <td>{s.location}</td>
                <td>{s.condition_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffDashboard;