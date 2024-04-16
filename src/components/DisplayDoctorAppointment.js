import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';

function DisplayDoctorAppointment(){
  const [doctor, setDoctor] = useState([{"first_name": "test", "last_name": "test", "email_address": "test@email.com", "title":"doctor"}]);
  const [appointments, setAppointments] = useState([{"first_name":"patient_t", "last_name":"patient_last", "appointment_date":"", "appointment_time":"", "clinic_name":"clinic"}]);
  const { doctor_id } = useParams();

  const fetchDoctorInfo = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    console.log(`employee id is ${doctor_id}`);

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/get_doctor/${doctor_id}`, requestOptions).then((response) => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }
<<<<<<< HEAD
        const fetchAppointments = async () => {
          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          };
          const employee_id = location.state.employee_id;
          console.log(`getting appointments for ${employee_id}` );
          fetch(`${process.env.REACT_APP_BACKEND_HOST}/viewappointment/${employee_id}`, requestOptions).then((response) => {
            response.json().then((data) => {
              if (response.status !== 200) {
                alert(data.error);
                return;
              }
              console.log(data.message);
              appointmentRef.current = data.message;
              setAppointment(appointmentRef.current);
              
              appointmentRef.current = data.message.map(appointment => ({
                ...appointment,
                appointment_date: appointment.appointment_date.split('T')[0],
                
              }));
              
              setAppointment(appointmentRef.current);

            
            });
          });
          
        }
        fetchDoctorInfo();
        fetchAppointments();

    }, [appointmentRef, doctorRef, location.state.employee_id]);
    console.log(doctor);
    console.log(appointments);

    return(<>
    <div className="DoctorInfo">
      <h1>{`${doctor[0].first_name} ${doctor[0].last_name}`}</h1>
      <div>
        <p>{ `${doctor[0].title}` }</p>
        <p>{ `${doctor[0].email_address}` }</p>
=======

        setDoctor(data.message);
      });
    });
  }

  const fetchAppointments = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    console.log(`getting appointments for ${doctor_id}` );

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/viewappointment/${doctor_id}`, requestOptions).then((response) => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        console.log(`Appointments: ${data.message}`);

        setAppointments(data.message);
        
        /*
          appointmentRef.current = appointments.map(appointment => ({
            ...appointment,
            appointment_date: appointment.appointment_date.split('T')[0], // Extract date part

          }));
        */

          //appointmentRef.current = data.message;
        //setAppointment(formatAppointment);
      });
    });
  }

  const fetchDoctorInfoRef = useRef(fetchDoctorInfo);
  const fetchAppointmentsRef = useRef(fetchAppointments);

  useEffect(() => {

    fetchDoctorInfoRef.current();
    fetchAppointmentsRef.current();

  }, [fetchDoctorInfoRef, fetchAppointmentsRef]);

  return(
    <>
      <div className="DoctorInfo">
        <h1>{`${doctor[0].first_name} ${doctor[0].last_name}`}</h1>
          <div>
            <p>{ `${doctor[0].title}` }</p>
            <p>{ `${doctor[0].email_address}` }</p>
          </div>
       </div>

      <hr style={{color:"black"}}/>
      
      <h2>Appointments</h2>
    
      <div className="container">
        <table className="table table-stripped" style={{ width: 100+ 'em'}}>
          <thead>
            <tr>
              <th>Patient F Name</th>
              <th>Patient L Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Clinic Address</th>
            </tr>
          </thead>
                
          <tbody>
            {appointments.map((app, index) => (
              <tr key={index}>
                <td>{`${app.first_name}`}</td>
                <td>{`${app.last_name}`}</td>
                <td>{`${app.appointment_date}`}</td>
                <td>{`${app.appointment_time}`}</td>
                <td>{`${app.clinic_name}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
>>>>>>> c0976a5 (update doctor appointment view)
      </div>
    </>
    );
}
// map everything in the appointments to the table data 
// need icon 
export default DisplayDoctorAppointment;
