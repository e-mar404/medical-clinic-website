import React, { useState, useEffect, useRef } from "react";
import './DisplayClinicAppointments.css'
import { Link } from "react-router-dom"

function DisplayClinicAppointment() {
  const [allAppointments, setAllAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [filter, setFilter] = useState('today');
  const [clinicId, setClinicId] = useState(null);
  
  // Function to fetch clinicId from backend
  const fetchClinicId = async (userId) => {
    console.log('fetchClinicId is called');
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
  
  const fetchAppointments = async (clinicId) => {
    console.log('fetchAppointments is called');
    console.log(clinicId);
    try {
      // Construct the URL with clinicId as a query parameter
      const url = `${process.env.REACT_APP_BACKEND_HOST}/clinicAppointments/${clinicId}`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  
      // Modify date and time format, add clinicId to each appointment object
      const modifiedAppointments = data.map(appointment => ({
        ...appointment,
        appointment_date: appointment.appointment_date.split('T')[0], // Extract date part
        appointment_time: formatTime(appointment.appointment_time), // Format time
        clinicId: clinicId,
        clinic_name: appointment.clinic_name,
        status: appointment.status,
      }));
  
      setAllAppointments(modifiedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  
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

  const fetchAppointmentsRef = useRef(fetchAppointments);
  const fetchClinicIdRef = useRef(fetchClinicId);

  useEffect(() => {
    const userId = localStorage.getItem('UserId');
    if (userId) {
      fetchClinicIdRef.current(userId);
    }
  
    if (clinicId !== null) {
      fetchAppointmentsRef.current(clinicId);
    }
  
  }, [clinicId]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; 
    const todayAppointments = allAppointments.filter(appointment => appointment.appointment_date === today);
    setTodayAppointments(todayAppointments);
  }, [allAppointments]);


  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      // Update the local state first
      const updatedAppointments = allAppointments.map(appointment => {
        if (appointment.appointment_id === appointmentId) {
          return { ...appointment, status: newStatus };
        }
        return appointment;
      });
      setAllAppointments(updatedAppointments);
  
      // Make a POST request to your endpoint
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment_id: appointmentId, status: newStatus })
      };
      const url = `${process.env.REACT_APP_BACKEND_HOST}/appointmentStatus`;
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Handle the response if needed
      const data = await response.json();
      console.log("Appointment status updated successfully:", data);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      // If there's an error, you might want to revert the local state change
      // or handle it in another way based on your requirements
    }
  };
  

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
        <Link to="/receptionist/makeAppointment"> 
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
              <th>Status</th> 
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
                <select 
                  onChange={(e) => handleStatusChange(appointment.appointment_id, e.target.value)} 
                  value={appointment.status}
                  disabled={appointment.status === 'no show'} 
                >
                  <option value="scheduled">scheduled</option>
                  {appointment.status === 'no show' && <option value="no show">no show</option>} 
                  <option value="cancelled">cancelled</option>
                  <option value="confirm">confirm</option>
                </select>
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
