import React, { useState, useEffect } from 'react';

function Dashboard({ user }) {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    const fetchSets = async () => {
      const response = await fetch('http://localhost:5000/sets', {
        headers: { 'User-ID': localStorage.getItem('userId') },
      });
      const data = await response.json();
      setSets(data);
    };
    fetchSets();
  }, []);

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Welcome, {user.full_name} ({user.role})</h3>
      {user.role === 'admin' && (
        <button onClick={() => {/* Navigate to add instrument/set */}}>
          Add Instrument/Set
        </button>
      )}
      <h4>Sets</h4>
      <ul>
        {sets.map((set) => (
          <li key={set.set_id}>
            {set.name} - {set.status} ({set.condition_status}) - {set.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;