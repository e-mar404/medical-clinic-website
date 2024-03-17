import React, { useState } from 'react';
import './LoginModal.css';

function PatientRegisterModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registerPatient(e){
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    };

    fetch('/patient/register', requestOptions).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="username" />
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="phone number" />
            <input type="text" placeholder="address" />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={(e) => registerPatient(e)}>Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientRegisterModal;
