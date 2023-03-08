import React from 'react';
import './Signin.css';

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = {
    email: email,
    password: password
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  fetch('/auth/login', options)
    .then(response => response.json())
    .then(data => console.log(data))
    .then(data => window.location.href = '/workflows')
    .catch(error => console.log(error));
}

function SignIn() {
  return (
    <div className="SignIn">
      <h1>Sign In</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
      </form>
        <button className='button' onClick={login}>Sign In</button>
    </div>
  );
}

export default SignIn;