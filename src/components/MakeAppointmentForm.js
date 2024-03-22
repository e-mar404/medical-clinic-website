import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; 
import './MakeAppointmentForm.css';

const MakeAppointmentForm = ({ firstName, lastName, email }) => {
  firstName = (firstName) ? firstName : localStorage.getItem('UserFirstName'); 
  lastName = (lastName) ? lastName : localStorage.getItem('UserLastName'); 
  email = (email) ? email : localStorage.getItem('UserEmail'); 

  const [formData, setFormData] = useState({
    clinic: 'Clinic 1',
    doctor: 'Doctor 1',
    date: null, 
    time: '1100',
    firstName: firstName, 
    lastName: lastName, 
    email: email,
  });

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
  
    const processedDoctor = formData.doctor.replace('Dr. ', '');
  
    const processedClinic = formData.clinic.replace(' Clinic', '');
  
    const appointmentData = {
      clinic: processedClinic,
      doctor: processedDoctor,
      date: formData.date.toISOString().slice(0, 10),
      time: processedTime,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
  
    console.log(appointmentData);
    try {
      const response = await fetch('/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (response.ok) {
        console.log('Appointment booked successfully!');
      } else {
        console.error('Failed to book appointment:', response.statusText);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }

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
      <div className="login-page">
        <form className="form" onSubmit={handleSubmit}>
            <label className="d-flex justify-content-center text-secondary">Clinic:</label>
            <select
              name="clinic"
              value={formData.clinic}
              onChange={handleClinicChange}
            >
              <option value="">Select Clinic</option>
              {/*clinic.map((clinic) => (
                <option key={clinic.name} value={clinic.name}>
                  {clinic.name}
                </option>
              ))*/}
            </select>

            <label className="d-flex justify-content-center text-secondary">Doctor:</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleInputChange}
            >
              <option value="">Select Doctor</option>
              {/*formData.clinic &&
                clinic
                  .find((clinic) => clinic.name === formData.clinic)
                  ?.doctors.map((doctor) => (
                    <option key={doctor.name} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))*/}
            </select>

            <label className="d-flex text-secondary">Date:</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              dateFormat="yyyy-MM-dd"
              showIcon
              toggleCalendarOnIconClick
            />

            <label className="d-flex justify-content-center text-secondary">Time:</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
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

            <button className="submit-button" type="submit">
              Book Appointment
            </button>
        </form>
      </div>
    </>
  );
};

export default MakeAppointmentForm;
