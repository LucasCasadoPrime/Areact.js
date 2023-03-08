import React, { useState, useEffect } from 'react';
import './Workflowdetails.css';

function Workflowdetails() {
  const id = window.location.pathname.split("/")[2];
  const [data, setData] = useState([]);

  console.log(id);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/getWorkflow/${id}`, {
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

  console.log(data);

  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this workflow?")) {
      return;
    }
    fetch(`/api/deleteWorkflow/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.reload();
        window.location.href = "/workflows";
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function handleEdit() {
    window.location.href = `/editWorkflow/${id}`;
  }

  function handleActivate() {
    fetch(`/api/startWorkflow/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function handleDeactivate() {
    fetch(`/api/stopWorkflow/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function getStatus() {
    if (data && data.length > 0) {
      const { cronJob } = data[0];
      if (cronJob && cronJob.active) {
        return "Active 🟢";
      } else {
        return "Inactive 🔴";
      }
    }
    return "Unknown ⛔";
  }

  return (
    <div>
      <nav>
        <div className="logo">
          <h2>Areact.Js</h2>
        </div>
      </nav>
      <div className="container-details">
        {data.map(item => (
          <div key={item.id} className="card-details">
            <div className="card-details-body">
              <p className="status">Status: {getStatus()}</p>
              <div className="action-reaction">
                <p><strong>Action:</strong> {item.action.name}</p>
                <p><strong>Parameters:</strong>[{item.action.params.join(',')}]</p>
                <p><strong>Parameters Type:</strong>[{item.action.paramsType.join(',')}]</p>
                <p><strong>Trigger:</strong> Cron({item.action.cron})</p>
              </div>
              <div className="action-reaction">
                <p><strong>Reaction:</strong> {item.reaction.name}</p>
                <p><strong>Parameters Type:</strong>[{item.reaction.paramsType.join(',')}]</p>
                <p><strong>Parameters:</strong>[{item.reaction.params.join(',')}]</p>
              </div>
              <div className="action-reaction">
                <button className="btn-warning" onClick={handleEdit}>Edit</button>
                <button className="btn-danger" onClick={handleDelete}>Delete</button>
                <button className="btn-success" onClick={handleActivate}>Start</button>
                <button className="btn-stop" onClick={handleDeactivate}>Stop</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workflowdetails;