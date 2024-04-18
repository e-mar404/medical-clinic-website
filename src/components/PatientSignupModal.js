import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import './PatientSignupModal.css';

function PatientSignupModal() {

  const [formData, setFormData] = useState({
    email: null,
    phone_number: null,
    adddress: null,
    password: null,
    first_name: null,
    last_name: null,
    gender: null,
    date_of_birth: null
  });

  function handleInputChange(e) {
    const { name, value } = e.target ? e.target : { name: 'date_of_birth', value: e };

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const nav = useNavigate();

  function registerPatient(e) {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        'date_of_birth': formData.date_of_birth.toISOString().slice(0, 10)
      })
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/register`, requestOptions).then((response) => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        alert("Successfully created account, you will now be signed in!");

        localStorage.setItem("LoggedIn", true);
        localStorage.setItem("UserType", "Patient");
        localStorage.setItem("UserEmail", data.message.email);
        localStorage.setItem("UserFirstName", formData.first_name);
        localStorage.setItem("UserLastName", formData.last_name);
        localStorage.setItem("UserId", data.message.id);

        nav('/patient', {});
      });
    });
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={registerPatient}>
            <label className="d-flex text-secondary">Email</label>
            <input type="email" name="email" placeholder="email" onChange={handleInputChange} required />

            <label className="d-flex text-secondary">Phone Number (123-456-7890)</label>
            <input type="tel" name="phone_number" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleInputChange} required />

            <label className="d-flex text-secondary">Address</label>
            <input type="text" name="address" placeholder="address" onChange={handleInputChange} required />

            <label className="d-flex text-secondary">First Name</label>
            <input type="text" name="first_name" placeholder="first name" onChange={handleInputChange} required />

            <label className="d-flex text-secondary">Last Name</label>
            <input type="text" name="last_name" placeholder="last name" onChange={handleInputChange} required />

            <label className="d-flex text-secondary">Gender</label>
            <select name="gender" onChange={handleInputChange} required>
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>

            <label className="d-flex text-secondary">Date of Birth</label>
            <DatePicker className="w-100" selected={formData.date_of_birth} onChange={handleInputChange} maxDate={subDays(new Date(), 0)} dateFormat="yyyy-MM-dd" showIcon toggleCalendarOnIconClick required />

            <label className="d-flex text-secondary">Password (min length: 8)</label>
            <input type="password" name="password" placeholder="password" minLength="8" onChange={handleInputChange} required />
            <button type="submit" className="submit-button" >Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientSignupModal;
