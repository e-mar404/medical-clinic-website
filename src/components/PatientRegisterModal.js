import React from 'react';
import './LoginModal.css';

function PatientRegisterModal() {
  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="username" />
            <input type="text" placeholder="email" />
            <input type="text" placeholder="phone number" />
            <input type="text" placeholder="address" />
            <input type="password" placeholder="password" />
            <button>register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientRegisterModal;
