import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SummaryUpload({ user }) {
  const [setId, setSetId] = useState('');
  const [items, setItems] = useState([]);
  const [sets, setSets] = useState([]);
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const setResponse = await fetch('http://sims21.pythonanywhere.com/sets', {
          headers: { 'User-ID': localStorage.getItem('userId') },
        });
        const instResponse = await fetch('http://sims21.pythonanywhere.com/instruments', {
          headers: { 'User-ID': localStorage.getItem('userId') },
        });
        setSets(await setResponse.json());
        setInstruments(await instResponse.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { instrument_id: '', actual_count: '' }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://sims21.pythonanywhere.com/upload-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-ID': localStorage.getItem('userId'),
        },
        body: JSON.stringify({ set_id: setId, items }),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        setItems([]);
        setSetId('');
      }
    } catch (error) {
      alert('Error uploading summary');
    }
  };

  if (!user) return <div className="alert alert-warning">Please log in</div>;

  return (
    <div className="container mt-5">
      <h3>Upload Summary</h3>
      <div className="card shadow-sm bg-warning-subtle border-warning">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                className="form-select"
                value={setId}
                onChange={(e) => setSetId(e.target.value)}
              >
                <option value="">Select Set</option>
                {sets.map((set) => (
                  <option key={set.set_id} value={set.set_id}>{set.name}</option>
                ))}
              </select>
            </div>
            {items.map((item, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={item.instrument_id}
                    onChange={(e) => handleItemChange(index, 'instrument_id', e.target.value)}
                  >
                    <option value="">Select Instrument</option>
                    {instruments.map((inst) => (
                      <option key={inst.instrument_id} value={inst.instrument_id}>{inst.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Actual Count"
                    value={item.actual_count}
                    onChange={(e) => handleItemChange(index, 'actual_count', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-outline-primary me-2" onClick={handleAddItem}>
              Add Item
            </button>
            <button type="submit" className="btn btn-primary">Upload Summary</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SummaryUpload;