import React, { useState, useEffect } from 'react';
import './Workflowscreen.css';

function Worflowscreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/getWorkflows', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <div>
      <nav>
        <div className="logo">
          <h2>Areact.Js</h2>
        </div>
        <ul className="nav-links">
          <li><a href="/addWorkflow" className='button'>+</a></li>
        </ul>
      </nav>
      <div className="container">
        {data.map(item => (
          <div key={item.id} className="card">
            <div className="card-body">
              <p><strong>Action:</strong> {item.action}</p>
              <p><strong>Reaction:</strong> {item.reaction}</p>
              <a href={`/workflow/${item.id}`} className="button-cards">Details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Worflowscreen;