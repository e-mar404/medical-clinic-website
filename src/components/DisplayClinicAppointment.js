import React, { useState, useEffect } from "react";
import './DisplayClinicAppointments.css'

function DisplayClinicAppointment() {
  const [allAppointments, setAllAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [filter, setFilter] = useState('today');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const clinicId = 1; // Specify the clinicId
        const requestOptions = {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Clinic-Id': clinicId // Pass clinicId in a custom header
          }
        };
        const url = `${process.env.REACT_APP_BACKEND_HOST}/clinicAppointments`;
    
        console.log('Request headers:', requestOptions.headers); // Log request headers
    
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // where is this being used?
        const today = new Date().toISOString().split('T')[0]; 
        console.log(today); // for eslint
        
        const modifiedAppointments = data.map(appointment => ({
          ...appointment,
          appointment_date: appointment.appointment_date.split('T')[0], // Extract date part
          appointment_time: formatTime(appointment.appointment_time), // Format time
          clinicId: clinicId
        }));

        setAllAppointments(modifiedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    
    fetchAppointments();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
    const todayAppointments = allAppointments.filter(appointment => appointment.appointment_date === today);
    setTodayAppointments(todayAppointments);
  }, [allAppointments]);

  // Function to format time
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Pad with leading zero if necessary
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  let filteredAppointments = [];
  if (filter === 'today') {
    filteredAppointments = todayAppointments;
  } else if (filter === 'past') {
    filteredAppointments = allAppointments.filter(appointment => new Date(appointment.appointment_date) < new Date());
  } else if (filter === 'upcoming') {
    filteredAppointments = allAppointments.filter(appointment => new Date(appointment.appointment_date) > new Date());
  }

  return (
    <>
     <div className="ClinicInfo">
       <h1 className="clinic-appointments-h1">MyClinic Appointments</h1>
        <div className="clinic-appointment-filter-container">
          <label className="clinic-appointment-filter-label" htmlFor="filter">Appointment Filter:</label>
          <select className="clinic-appointment-filter-select" id="filter" onChange={handleFilterChange} value={filter}>
            <option value="today">Today's Appointments</option>
            <option value="past">Past Appointments</option>
            <option value="upcoming">Upcoming Appointments</option>
          </select>
        </div>
      </div>

      <hr style={{ width: "101em", color: "black" }} />

    
      <div className="container">
        <table className="table table-striped" style={{ width: "100em" }}>
          <thead>
            <tr>
              <th>Patient First Name</th>
              <th>Patient Last Name</th>
              <th>Doctor First Name</th>
              <th>Doctor Last Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Clinic ID</th> {/* Add Clinic ID column */}
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.patient.first_name}</td>
                <td>{appointment.patient.last_name}</td>
                <td>{appointment.doctor.first_name}</td>
                <td>{appointment.doctor.last_name}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.clinicId}</td> {/* Display Clinic ID */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayClinicAppointment;
