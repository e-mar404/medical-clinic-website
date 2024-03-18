import React, { useState } from 'react';
import './LoginModal.css';

function PatientRegisterModal() {
  const [email, setEmail] = useState('');
  const [pnumber, setPnumber] = useState(''); 
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [dob, setDob] = useState('');

  function registerPatient(e){
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'email': email,
        'phone_number': pnumber,
        'address': address,
        'password': password,
        'first_name': fname,
        'last_name': lname,
        'date_of_birth': dob
      })
    };

    fetch('/patient/register', requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="phone number" onChange={(e) => setPnumber(e.target.value)} />
            <input type="text" placeholder="address" onChange={(e) => setAddress(e.target.value)} />
            <input type="text" placeholder="first name" onChange={(e) => setFname(e.target.value)} />
            <input type="text" placeholder="last name" onChange={(e) => setLname(e.target.value)} />
            <input type="text" placeholder="date of birth (yyyy-mm-dd)" onChange={(e) => setDob(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={(e) => registerPatient(e)}>Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientRegisterModal;
