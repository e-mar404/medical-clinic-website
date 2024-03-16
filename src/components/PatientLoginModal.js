import React from 'react';
import './LoginModal.css';

function PatientLoginModal() {
  return (
    <>
      <div class="login-page">
        <div class="form">
          <form class="login-form">
            <input type="text" placeholder="patientid" />
            <input type="password" placeholder="password" />
            <button>login</button>
            <p class="message">New patient? <a href="/patient/register">Register here!</a></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientLoginModal;
