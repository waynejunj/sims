import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function StaffManagement({ user }) {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://sims21.pythonanywhere.com/users', {
          headers: { 'User-ID': localStorage.getItem('userId') },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);


  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://sims21.pythonanywhere.com/users/${userId}`, {
          method: 'DELETE',
          headers: { 'User-ID': localStorage.getItem('userId') },
        });
        const data = await response.json();
        if (response.ok) {
          setAlert({ show: true, message: data.message, type: 'success' });
          setUsers(users.filter((u) => u.user_id !== userId));
          setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
        } else {
          setAlert({ show: true, message: data.message, type: 'danger' });
          setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
        }
      } catch (error) {
        setAlert({ show: true, message: 'Error deleting user', type: 'danger' });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
      }
    }
  };

  if (!user || user.role !== 'admin') return <div className="alert alert-warning">Unauthorized</div>;

  return (
    <div className="container mt-5">
      <h3>Staff Management</h3>
      {alert.show && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ show: false, message: '', type: '' })}></button>
        </div>
      )}
      <div className="card mb-4 shadow-sm bg-warning-subtle border-warning">
        <div className="card-body">
          <Link to='/' className='btn '>Add New User</Link>
          
        </div>
      </div>
      <h5>Existing Users</h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td>{u.username}</td>
                <td>{u.full_name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => alert('Edit not implemented')}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(u.user_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffManagement;