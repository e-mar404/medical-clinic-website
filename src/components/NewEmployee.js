import React, { useState } from 'react';
import './LoginModal.css';

function NewEmployee() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registerEmployee(e){
    e.preventDefault();
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form">
          <label>New employee</label>
            <input type="text" placeholder="username" />
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="phone number" />
            <input type="text" placeholder="address" />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <select class="form-select">
                <option selected disabled>Role</option>
                <option value="1">Doctor</option>
                <option value="2">Nurse</option>
                <option value="3">Office</option>
            </select>

            <button onClick={(e) => registerEmployee(e)}>Register</button>
         </form>
        </div>
      </div>
    </>
  );
}

export default NewEmployee;