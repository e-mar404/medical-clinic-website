import React, { useState } from 'react';
import './LoginModal.css';

function NewEmployee() {

  const [specialistValue, setSpecialistValue] = useState(false);
  const adminID = localStorage.getItem('UserEmail'); //NEED TO FETCH THE CLINIC ID
  const [formData, setFormData] = useState({
    email: null, 
    phone_number: '',
    address: '',
    password: '',
    first_name: '',
    last_name: '',
    role: '',
    type: '',
    title: '',
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  }

  const handleRoleChange = (e) => {
      //setRole(e.target.value);
      if(e.target.value === "Doctor" || e.target.value === "Nurse"){
        formData.type= "Medical";
      }else{
        formData.type = "Staff";
      }
      handleInputChange(e);
  };

  const handleSpecialist = (e) => {
    if(e.target.value === "true"){
      setSpecialistValue(true);
    }
    else{
      setSpecialistValue(false);
    }
  }
  
  function registerEmployee(e){
    e.preventDefault();

    const request = {
      method:'GET',
      headers: { 'Content-Type': 'application/json'},
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/getAdminClinic/${adminID}`, request).then((response) => {
      response.json().then((data) => {
      if(response.status !== 200){
        alert("fix admin fetch clinic");
        return;
      }

      const clinic = data.message[0].primary_clinic;

    
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
        'employee_type': formData.type,
        'specialist': specialistValue,
        'title': formData.title,
        'primary_clinic': clinic
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
    });
  });

    
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={registerEmployee}>
          <label>New employee</label>
            <input type="text" name="email" placeholder="email" onChange={handleInputChange} required/>
            <input type="tel" name="phone_number" placeholder="phone number" onChange={handleInputChange} required/>
            <input type="text" name="address" placeholder="address" onChange={handleInputChange} required/>
            <input type="password" name="password" placeholder="password" onChange={handleInputChange} required/>
            <input type="text" name="first_name" placeholder="first name" onChange={handleInputChange} required/>
            <input type="text" placeholder="middle initial" onChange={handleInputChange} />
            <input type="text" name="last_name" placeholder="last name" onChange={handleInputChange} required/>
            <select className="form-select" name="role" onChange={handleRoleChange} required> 
                <option selected disabled>Role</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Administrator">Administrator</option>
            </select>
              <select className="form-select" name="specialist" onChange={handleSpecialist} required> 
                  <option selected disabled>Specialist?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
              </select>
              <input type="text" name="title" placeholder="Title" onChange={handleInputChange} required/>
            <button className="submit-button" type="submit">Register</button>
         </form>
        </div>
      </div>
    </>
  );
}

export default NewEmployee;

// on submit 1 get admin id and then s
