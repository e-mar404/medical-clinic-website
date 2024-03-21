import React, { useState } from 'react';
import './LoginModal.css';

function PatientLoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const loginFunction = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'email': email,
        'password': password,
      })
    };

    fetch('/patient/login', requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(response.status);
      });
    });

    //localStorage.setItem("LoggedIn", true);
    //console.log(email, password);
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="patientid" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={loginFunction}>login</button>
            <p className="message">New patient? <a href="/patient/register">Register here!</a></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientLoginModal;
