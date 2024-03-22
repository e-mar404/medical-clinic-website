import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginModal.css';

function EmployeeLoginModal() {
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

    fetch('/employee/login', requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(response.status);
        if (response.status === 200) {
          alert("Successfully signed in!");
          localStorage.setItem("LoggedIn", true);
          localStorage.setItem("UserEmail", email);
          localStorage.setItem("UserId", data.message[0].employee_id);
          localStorage.setItem("UserFirstName", data.message[0].first_name);
          localStorage.setItem("UserLastName", data.message[0].last_name);
          localStorage.setItem("UserType", data.message[0].employee_role);
          console.log(data);
          nav('/employee', {});
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
            <input type="text" placeholder="employeeid" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={loginFunction}>login</button>
            <p className="message">New employees are generated by the administrator</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployeeLoginModal;
