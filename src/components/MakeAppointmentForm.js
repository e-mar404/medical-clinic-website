import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import { subDays } from 'date-fns';
import './MakeAppointmentForm.css';

const MakeAppointmentForm = ({ patientEmail }) => {
  patientEmail = (patientEmail) ? patientEmail : localStorage.getItem('UserEmail'); 
  const [clinics, setClinics] = useState([{'clinic_id': 0, 'clinic_name': 'Select clinic'}]);
  const [doctors, setDoctors] = useState([{'employee_id': 0, 'first_name': '', 'last_name': ''}]);
  const [availableTimes, setAvailableTimes] = useState(['Select a date']);
  const [formData, setFormData] = useState({
    clinicId: -1,
    doctorId: -1,
    date: new Date(), 
    time: -1,
    patientEmail: patientEmail,
  });
  const clinicsRef = useRef(clinics);

  const getDateString = (date) => {
    return `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
  }

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const fetchClinics = async () => {
      console.log('fetching clinics');

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
 
  const fetchAvailableTimes = async (clinic_id, doctor_id, date) => {
    console.log(`fetching available appointments with values clinic_id:${clinic_id} doctor_id:${doctor_id} date:${getDateString(date)}`);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'clinic_id': clinic_id,
        'doctor_id': doctor_id,
        'date': getDateString(date)     
      })
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/available_appointments`, requestOptions).then((response) => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        setAvailableTimes(data.message);
      });
    });
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData(prevData => {
      const updatedData = {
        ...prevData,
        [name]: value,
      }

      if (name === 'doctorId') {
        fetchAvailableTimes(updatedData.clinicId, updatedData.doctorId, updatedData.date);
      }

      if (name === 'clinicId' && parseInt(value) !== -1) {
        setDoctors([{"employee_id": 0, "first_name": "", "last_name": ""}]);
        fetchAvailableTimes(updatedData.clinicId, updatedData.doctorId, updatedData.date);
        fetchClinicEmployees(value);
      }

      return updatedData;
    });

  };

  const handleDateChange = (date) => {
    setFormData(prevData => {
      const updatedData = { 
        ...prevData, 
        'date': date
      }

      fetchAvailableTimes(updatedData.clinicId, updatedData.doctorId, updatedData.date);    

      return updatedData;
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

    if (formData.time === -1) {
      alert('Please select a time');
      return;
    }

    if (formData.time === 'No appointments available for this day') {
      alert('Please select a day or doctor with available appointment times');
      return;
    }
     
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...formData,
        'date': getDateString(formData.date)
      })
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
  
  return (
    <>
      <div className="login-page">
        <form className="form" onSubmit={handleSubmit}>
            <label className="d-flex justify-content-center text-secondary">Clinic:</label>
            <select
              name="clinicId"
              value={formData.clinicId}
              onChange={handleInputChange}
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
              className="date-picker"
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={subDays(new Date(), 0)}
              showIcon
              toggleCalendarOnIconClick
              required
            />

            <label className="d-flex justify-content-center text-secondary">Time: (24h)</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            >
              <option key={0} value={-1} disabled>Select a time</option>
              {availableTimes.map(time => (
                <option key={availableTimes.indexOf(time)} value={time}>{time}</option>
              ))}
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
