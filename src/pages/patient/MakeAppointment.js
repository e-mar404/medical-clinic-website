import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import '../../styles/MakeAppointment.css';

const MakeAppointment = () => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    time: '',
    doctor: '',
    clinic: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement appointment booking logic here
    console.log('Form submitted with data:', formData);
    // Reset form data after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      time: '',
      doctor: '',
      clinic: '',
    });
  };

  return (
    <>
      <Navbar />
      <div className="appointment-page-container">
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Doctor:</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Doctor</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Johnson">Dr. Johnson</option>
              {/* Add more options for other doctors */}
            </select>
          </div>
          <div className="form-group">
            <label>Clinic:</label>
            <input
              type="text"
              name="clinic"
              value={formData.clinic}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="appointment-button-container">
            <button className="appointment-button" type="submit">Book Appointment</button>
          </div>
        </form>
        </div>
    </>
  );
};

export default MakeAppointment;
