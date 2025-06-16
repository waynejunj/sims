import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function EquipmentManagement({ user }) {
  const [instruments, setInstruments] = useState([]);
  const [sets, setSets] = useState([]);
  const [newInstrument, setNewInstrument] = useState({ name: '', serial_number: '', barcode: '', type: '', description: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instResponse = await fetch('http://sims21.pythonanywhere.com/instruments', {
          headers: { 'User-ID': localStorage.getItem('userId') },
        });
        const setResponse = await fetch('http://sims21.pythonanywhere.com/sets', {
          headers: { 'User-ID': localStorage.getItem('userId') },
        });
        setInstruments(await instResponse.json());
        setSets(await setResponse.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddInstrument = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://sims21.pythonanywhere.com/instruments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-ID': localStorage.getItem('userId'),
        },
        body: JSON.stringify(newInstrument),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        setInstruments([...instruments, { ...newInstrument, instrument_id: data.instrument_id }]);
        setNewInstrument({ name: '', serial_number: '', barcode: '', type: '', description: '' });
      }
    } catch (error) {
      alert('Error adding instrument');
    }
  };

  if (!user || user.role !== 'admin') return <div className="alert alert-warning">Unauthorized</div>;

  return (
    <div className="container mt-5">
      <h3>Equipment Management</h3>
      <div className="card mb-4 shadow-sm bg-warning-subtle border-warning">
        <div className="card-body">
          <h5>Add New Instrument</h5>
          <form onSubmit={handleAddInstrument}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={newInstrument.name}
                  onChange={(e) => setNewInstrument({ ...newInstrument, name: e.target.value })}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Serial Number"
                  value={newInstrument.serial_number}
                  onChange={(e) => setNewInstrument({ ...newInstrument, serial_number: e.target.value })}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Barcode"
                  value={newInstrument.barcode}
                  onChange={(e) => setNewInstrument({ ...newInstrument, barcode: e.target.value })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type"
                  value={newInstrument.type}
                  onChange={(e) => setNewInstrument({ ...newInstrument, type: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={newInstrument.description}
                  onChange={(e) => setNewInstrument({ ...newInstrument, description: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Instrument</button>
          </form>
        </div>
      </div>
      <h5>Instruments</h5>
      <div className="table-responsive mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Serial Number</th>
              <th>Barcode</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instruments.map((i) => (
              <tr key={i.instrument_id}>
                <td>{i.name}</td>
                <td>{i.serial_number}</td>
                <td>{i.barcode}</td>
                <td>{i.type}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => alert('Edit not implemented')}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => alert('Delete not implemented')}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h5>Sets</h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Barcode</th>
              <th>Total Items</th>
              <th>Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sets.map((s) => (
              <tr key={s.set_id}>
                <td>{s.name}</td>
                <td>{s.barcode}</td>
                <td>{s.total_items}</td>
                <td>{s.status}</td>
                <td>{s.location}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => alert('Edit not implemented')}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => alert('Delete not implemented')}>
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

export default EquipmentManagement;