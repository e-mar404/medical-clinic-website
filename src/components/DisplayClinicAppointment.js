import React, { useState, useEffect } from "react";
import './DisplayClinicAppointments.css'
import { Link } from "react-router-dom"

function DisplayClinicAppointment() {
  const [allAppointments, setAllAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [filter, setFilter] = useState('today');
  const [clinicId, setClinicId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('UserId');
    if (userId) {
      fetchClinicId(userId);
    }
  }, []);
  
  useEffect(() => {
    if (clinicId !== null) {
      fetchAppointments();
    }
  }, [clinicId]);
  
  // Function to fetch clinicId from backend
  const fetchClinicId = async (userId) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
        }
      };
      const url = `${process.env.REACT_APP_BACKEND_HOST}/getClinicOfReceptionist/${userId}`;
  
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setClinicId(data.clinicId); // Update clinicId state with the fetched value
    } catch (error) {
      console.error("Error fetching clinicId:", error);
    }
  };
  
  const fetchAppointments = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Clinic-Id': clinicId // Pass clinicId in a custom header
        }
      };
      const url = `${process.env.REACT_APP_BACKEND_HOST}/clinicAppointments`;
  
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  
      // Modify date and time format, add clinicId to each appointment object
      const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
      const modifiedAppointments = data.map(appointment => ({
        ...appointment,
        appointment_date: appointment.appointment_date.split('T')[0], // Extract date part
        appointment_time: formatTime(appointment.appointment_time), // Format time
        clinicId: clinicId,
        clinic_name: appointment.clinic_name
      }));
  
      setAllAppointments(modifiedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
    const todayAppointments = allAppointments.filter(appointment => appointment.appointment_date === today);
    setTodayAppointments(todayAppointments);
  }, [allAppointments]);

  // Function to format time
  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Pad with leading zero if necessary
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (appointmentId) => {
    // Handle checkbox change logic here
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
        <h1 className="clinic-appointments-h1">{allAppointments.length > 0 ? `${allAppointments[0].clinic_name} Appointments` : 'Clinic Appointments'}</h1>
        <div className="clinic-appointment-filter-container">
          <label className="clinic-appointment-filter-label" htmlFor="filter">Appointment Filter:</label>
          <select className="clinic-appointment-filter-select" id="filter" onChange={handleFilterChange} value={filter}>
            <option value="today">Today's Appointments</option>
            <option value="past">Past Appointments</option>
            <option value="upcoming">Upcoming Appointments</option>
          </select>
        </div>
        <Link to="/make_appointment"> 
          <button className="make-appointment-button">Make Appointment</button>
        </Link>
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
              <th>Show</th> {/* Changed Clinic ID column to Show */}
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
                <td>
                  <input 
                    type="checkbox" 
                    onChange={() => handleCheckboxChange(appointment.id)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayClinicAppointment;
