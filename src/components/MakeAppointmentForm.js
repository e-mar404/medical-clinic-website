import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import { subDays } from "date-fns";
import './MakeAppointmentForm.css';

const MakeAppointmentForm = ({ patientEmail }) => {
  const [clinics, setClinics] = useState([{"clinic_id": 0, "clinic_name": "Select clinic"}]);
  const [doctors, setDoctors] = useState([{"employee_id": 0, "first_name": "", "last_name": ""}]);
  const clinicsRef = useRef(clinics);

  const fetchClinicEmployees = async (clinic_id=0) => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'text/plain' }
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/employee/byclinic/${clinic_id}/doctor`, requestOptions).then((response) => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        setDoctors(data.message);
      });
    });
  }
  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const fetchClinics = async () => {
      fetch(`${process.env.REACT_APP_BACKEND_HOST}/get_clinics`, requestOptions).then((response) => {
        response.json().then((data) => {
          if (response.status !== 200) {
            alert(data.error);
            return;

          }

          clinicsRef.current = data.message;
          setClinics(clinicsRef.current);
        });
      });

    }

    fetchClinics();

    console.log('use effect called');
  }, [clinicsRef]); 

  patientEmail = (patientEmail) ? patientEmail : localStorage.getItem('UserEmail'); 

  const [formData, setFormData] = useState({
    clinicId: -1,
    doctorId: -1,
    date: null, 
    time: '1100',
    patientEmail: patientEmail,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.clinicId === -1) {
      alert('Plese select a clinic');
      return;
    }

    if (formData.doctorId === -1) {
      alert('Please select a doctor');
      return;
    }

    let processedTime = formData.time;
    if (formData.time.includes('PM')) {
      const hour = parseInt(formData.time.split(':')[0]);

      processedTime = `${hour === 12 ? '12' : hour + 12}:${formData.time.split(':')[1].split(' ')[0]}`;

    } else if (formData.time.includes('AM')) {
      const hour = parseInt(formData.time.split(':')[0]);

      if (hour === 12) {
        processedTime = `00:${formData.time.split(':')[1].split(' ')[0]}`;

      } else {
        processedTime = `${hour}:${formData.time.split(':')[1].split(' ')[0]}`;
      }
    }
  
    const appointmentData = {
      clinicId: formData.clinicId,
      doctorId: formData.doctorId,
      date: formData.date.toISOString().slice(0, 10),
      time: processedTime,
      patientEmail: formData.patientEmail,
    };
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/make_appointment`, requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(data);

        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        alert(data.message);
        nav('/', {});
      });
    });
  };
  
  
  const handleClinicChange = (e) => {
    const { value } = e.target;

    if (parseInt(value) !== -1)  {
      handleInputChange(e);

      fetchClinicEmployees(value);
      return;
    }

    setDoctors([{"employee_id": 0, "first_name": "", "last_name": ""}]);

    console.log(doctors);
  };

  return (
    <>
      <div className="login-page">
        <form className="form" onSubmit={handleSubmit}>
            <label className="d-flex justify-content-center text-secondary">Clinic:</label>
            <select
              name="clinicId"
              value={formData.clinicId}
              onChange={handleClinicChange}
              defaultValue={-1}
              required
            >
              <option key={0} value={-1} disabled>Select a clinic</option>
              {clinics.map((clinic) => (
                <option key={clinic.clinic_id} value={clinic.clinic_id}>{clinic.clinic_name}</option>
              ))}
            </select>

            <label className="d-flex justify-content-center text-secondary">Doctor:</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              defaultValue={-1}
              required
            >
              <option key={0} value={-1} disabled>Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.employee_id} value={doctor.employee_id}>{`Dr. ${doctor.first_name} ${doctor.last_name}`}</option>
              ))}
            </select>

            <label className="d-flex text-secondary">Date: (yyyy-mm-dd)</label>
            <DatePicker
              name="date"
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              dateFormat="yyyy-MM-dd"
              minDate={subDays(new Date(), 0)}
              showIcon
              toggleCalendarOnIconClick
              required
            />

            {/*Add taken slot later*/}
            <label className="d-flex justify-content-center text-secondary">Time:</label>
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

            <button className="submit-button" type="submit">
              Book Appointment
            </button>
        </form>
      </div>
    </>
  );
};

export default MakeAppointmentForm;
