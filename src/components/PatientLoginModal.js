import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginModal.css';

function PatientLoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const nav = useNavigate();

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
    fetch(`${process.env.BACKEND_HOST}/patient/login`, requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(response.status);
        if (response.status === 200) {
          alert("Successfully signed in!");
          localStorage.setItem("LoggedIn", true);
          localStorage.setItem("UserEmail", email);
          localStorage.setItem("UserId", data.message[0].patient_id);
          localStorage.setItem("UserFirstName", data.message[0].first_name);
          localStorage.setItem("UserLastName", data.message[0].last_name);
          localStorage.setItem("UserType", "Patient");
          console.log(data);
          nav('/patient', {});
        }
        else {
          alert("Invalid credentials! Please try again.");
        }
      });
    });
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="patientid" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="submit-button" onClick={loginFunction}>login</button>
            <p className="message">New patient? <a href="/patient/signup">Register here!</a></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientLoginModal;
