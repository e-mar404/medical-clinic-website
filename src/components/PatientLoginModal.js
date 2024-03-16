import React from 'react';
import './PatientLoginModal.css';

function PatientLoginModal() {
  return (
    <>
      <div class="login-page">
        <div class="form">
          <form class="register-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <p class="message">Already registered? <za href="#">Sign In</za></p>
          </form>
          <form class="login-form">
            <input type="text" placeholder="username" />
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
