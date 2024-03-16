import React from 'react';
import './LoginModal.css';

function PatientLoginModal() {
  
  const loginFunction = () => {
    localStorage.setItem("LoggedIn", true);
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="patientid" />
            <input type="password" placeholder="password" />
            <button onClick={loginFunction}>login</button>
            <p className="message">New patient? <a href="/patient/register">Register here!</a></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientLoginModal;
