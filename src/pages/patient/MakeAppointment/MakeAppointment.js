import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import DatePicker from 'react-datepicker'; // Import datepicker library
import 'react-datepicker/dist/react-datepicker.css'; // Import datepicker styles
import clinic from './clinic'; // Import the updated clinic data structure
import '../../../styles/MakeAppointment.css';

const MakeAppointment = () => {
  const [formData, setFormData] = useState({
    clinic: '',
    doctor: '',
    date: null, // Initialize date as null
    time: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const [appointments, setAppointments] = useState([]); // Define appointments state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Preprocess time data
    let processedTime = formData.time;
    if (formData.time.includes('PM')) {
      // Convert PM time to military time
      const hour = parseInt(formData.time.split(':')[0]);
      processedTime = `${hour === 12 ? '12' : hour + 12}:${formData.time.split(':')[1].split(' ')[0]}`;
    } else if (formData.time.includes('AM')) {
      // Convert AM time to military time
      const hour = parseInt(formData.time.split(':')[0]);
      if (hour === 12) {
        processedTime = `00:${formData.time.split(':')[1].split(' ')[0]}`;
      } else {
        processedTime = `${hour}:${formData.time.split(':')[1].split(' ')[0]}`;
      }
    }
  
    // Remove 'Dr.' from the selected doctor name
    const processedDoctor = formData.doctor.replace('Dr. ', '');
  
    // Remove 'Clinic' from the selected clinic name
    const processedClinic = formData.clinic.replace(' Clinic', '');
  
    // Create an object with appointment data to send to the backend
    const appointmentData = {
      clinic: processedClinic,
      doctor: processedDoctor,
      date: formData.date.toISOString().slice(0, 10),
      time: processedTime,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
  
    try {
      // Make a POST request to the backend endpoint to process the appointment data
      const response = await fetch('/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        console.log('Appointment booked successfully!');
        // Optionally, you can handle further actions after a successful appointment booking
      } else {
        console.error('Failed to book appointment:', response.statusText);
        // Optionally, handle errors or display error messages to the user
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle any network errors or exceptions
    }
  
    // Reset form fields
    setFormData({
      clinic: '',
      doctor: '',
      date: null,
      time: '',
      firstName: '',
      lastName: '',
      email: '',
    });
  };
  
  
  const handleClinicChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      clinic: value,
      doctor: '', // Reset doctor selection when clinic changes
    });
  };


  return (
    <>
      <Navbar />
      <div className="appointment-page-container">
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Clinic:</label>
            <select
              name="clinic"
              value={formData.clinic}
              onChange={handleClinicChange}
              required
            >
              <option value="">Select Clinic</option>
              {clinic.map((clinic) => (
                <option key={clinic.name} value={clinic.name}>
                  {clinic.name}
                </option>
              ))}
            </select>
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
              {formData.clinic &&
                clinic
                  .find((clinic) => clinic.name === formData.clinic)
                  ?.doctors.map((doctor) => (
                    <option key={doctor.name} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Time</option>
              <option value="08:00 AM">8:00 AM</option>
              <option value="09:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="01:00 PM">1:00 PM</option>
              <option value="02:00 PM">2:00 PM</option>
              <option value="03:00 PM">3:00 PM</option>
              <option value="04:00 PM">4:00 PM</option>
              <option value="05:00 PM">5:00 PM</option>
            </select>
          </div>
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
          {/* Add other form fields */}
          <div className="appointment-button-container">
            <button className="appointment-button" type="submit">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MakeAppointment;
