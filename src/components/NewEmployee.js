import React, { useState } from 'react';
import './LoginModal.css';

// need function to register the employee ahhhhhhhhhhh
// then do fetch to the console to see the output

function NewEmployee() {
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [middle_name, setMiddleName] = useState('');
  const [last_name, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState('');

  const handleRoleChange = (e) => {
      setRole(e.target.value);
      if(e.target.value === "Doctor" || e.target.value === "Nurse"){
        setType("Medical");
      }else{
        setType("Staff");
      }
  };


//email, phone_number, address, password, first_name, middle_initial, last_name
  function registerEmployee(e){
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        'email': email,
        'phone_number':phone_number,
        'address': address,
        'password': password,
        'first_name': first_name,
        'middle_name': middle_name,
        'last_name': last_name,
        'employee_role': role,
        'employee_type': type
        //need to figure out how to get the primary clinic and employee type and phone number
      })
    };
    fetch(`${process.env.REACT_APP_BACKEND_HOST}/admin/newemployee`, requestOptions).then((response) => {
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
          <label>New employee</label>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
            <input type="text" placeholder="address" onChange={(e) => setAddress(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="first name" onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="middle initial" onChange={(e) => setMiddleName(e.target.value)}/>
            <input type="text" placeholder="last name" onChange={(e) => setLastName(e.target.value)}/>
            <select className="form-select" onChange={handleRoleChange}> 
                <option selected disabled>Role</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Administrator">Administrator</option>
            </select>

            <button className="submit-button" type="submit" onClick={(e) => registerEmployee(e)}>Register</button>
         </form>
        </div>
      </div>
    </>
  );
}

export default NewEmployee;
