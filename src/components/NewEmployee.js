import React, { useState } from 'react';
import './LoginModal.css';

// need function to register the employee ahhhhhhhhhhh
// then do fetch to the console to see the output

function NewEmployee() {
  /*
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [middle_name, setMiddleName] = useState('');
  const [last_name, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState('');
 */

  const [formData, setFormData] = useState({
    email: null, 
    phone_number: '',
    address: '',
    password: '',
    first_name: '',
    last_name: '',
    role: '',
    type: '',
    specialist: ''
  });

  function registerInput(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    //console.log(formData);
  }

  const handleRoleChange = (e) => {
      //setRole(e.target.value);
      if(e.target.value === "Doctor" || e.target.value === "Nurse"){
        formData.type= "Medical";
      }else{
        formData.type = "Staff";
      }
      registerInput(e);
  };


//email, phone_number, address, password, first_name, middle_initial, last_name
  function registerEmployee(e){
    e.preventDefault();
    console.log(formData);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        'email': formData.email,
        'phone_number': formData.phone_number,
        'address': formData.address,
        'password': formData.password,
        'first_name': formData.first_name,
        'middle_name': formData.middle_name,
        'last_name': formData.last_name,
        'employee_role': formData.role,
        'employee_type': formData.type
        //'primary_clinic': localStorage
        //need to figure out how to get the primary clinic and employee type and phone number
      })
    };
    
    fetch(`${process.env.REACT_APP_BACKEND_HOST}/admin/newemployee`, requestOptions).then((response) => {
        response.json().then((data) => {
        console.log(data);
        if(response.status === 200){
          alert("Employee created successfully!");
        }
        else{
          alert("Failed to create new employee!");
        }
      });
    });
    
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={registerEmployee}>
          <label>New employee</label>
            <input type="text" name="email" placeholder="email" onChange={registerInput} required/>
            <input type="tel" name="phone_number" placeholder="phone number" onChange={registerInput} required/>
            <input type="text" name="address" placeholder="address" onChange={registerInput} required/>
            <input type="password" name="password" placeholder="password" onChange={registerInput} required/>
            <input type="text" name="first_name" placeholder="first name" onChange={registerInput} required/>
            <input type="text" placeholder="middle initial" onChange={registerInput} />
            <input type="text" name="last_name" placeholder="last name" onChange={registerInput} required/>
            <select className="form-select" name="role" onChange={handleRoleChange} required> 
                <option selected disabled>Role</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Administrator">Administrator</option>
            </select>

            <button className="submit-button" type="submit">Register</button>
         </form>
        </div>
      </div>
    </>
  );
}

export default NewEmployee;
