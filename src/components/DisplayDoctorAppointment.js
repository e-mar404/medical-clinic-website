import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';

function DisplayDoctorAppointment(){
  const [doctor, setDoctor] = useState([{"first_name": "test", "last_name": "test", "email_address": "test@email.com", "title":"doctor"}]);
  const [appointments, setAppointments] = useState([{"patient_id": 0, "first_name":"patient_t", "last_name":"patient_last", "appointment_date":"", "appointment_time":"", "clinic_name":"clinic"}]);
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

        console.log(data.message);
        console.log(`Appointments: ${data.message}`);

        const fixDate = data.message.map((app) => ({
          ...app,
          appointment_date: app.appointment_date.split('T')[0],
        }));
        

        setAppointments(fixDate);
        
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
    
      <div className="container-fluid">
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Clinic Name</th>
            </tr>
          </thead>
                
          <tbody>
            {appointments.map((app, index) => (
              <tr key={index}>
                <td>
                  <a href={
                    (localStorage.getItem('UserType') === 'Doctor') ? `/doctor/patient_medical_history/${app.patient_id}` : `/doctor/appointment_calendar/${doctor_id}`
                  }>
                    {app.first_name} {app.last_name}
                  </a>
                </td>
                <td>{`${app.appointment_date}`}</td>
                <td>{`${app.time}`}</td>
                <td>{`${app.clinic_name}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    );
}
// map everything in the appointments to the table data 
// need icon 
export default DisplayDoctorAppointment;
