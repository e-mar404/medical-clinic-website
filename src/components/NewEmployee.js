import React, { useState } from 'react';
import './LoginModal.css';

// need function to register the employee ahhhhhhhhhhh
// then do fetch to the console to see the output

function NewEmployee() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [first_name, setFirstName] = useState('');
  const [m_initial, setMiddleInitial] = useState('');
  const [last_name, setLastName] = useState('');

  function registerEmployee(e){
    e.preventDefault();

    
    setRole('for eslint');
    console.log(email, password, role, first_name, m_initial, last_name);
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form">
          <label>New employee</label>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="first name" onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="middle initial" onChange={(e) => setMiddleInitial(e.target.value)}/>
            <input type="text" placeholder="last name" onChange={(e) => setLastName(e.target.value)}/>
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
