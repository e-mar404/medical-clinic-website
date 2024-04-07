import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 

function ReferralsForm() {
  const [specialists, setSpecialists] = useState([{"employee_id": 0, "first_name": "", "last_name": ""}]);
  const [patients, setPatients] = useState([{"patient_id": 0, "patient_fname": "", "patient_lname": ""}]);

  const specialistsRef = useRef();
  const patientsRef = useRef();

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const fetchSpecialists = async () => {
      fetch(`${process.env.REACT_APP_BACKEND_HOST}/employee/specialists`, requestOptions).then((response) => {
        response.json().then((data) => {
          if (response.status !== 200) {
            alert(data.error);
            return;
          }

          console.log(data.message);
          specialistsRef.current = data.message;
          setSpecialists(specialistsRef.current);
        });
      });
    }

    const fetchPatients = async () => {
      const doctor_id = localStorage.getItem("UserId");

      fetch(`${process.env.REACT_APP_BACKEND_HOST}/employee/patients_of/${doctor_id}`, requestOptions).then((response) => {
        response.json().then((data) => {
          if (response.status !== 200) {
            alert(data.error);
            return;
          }

          console.log(data.message);
          patientsRef.current = data.message;
          setPatients(patientsRef.current);
        });
      });
    }


    fetchSpecialists();
    fetchPatients();

    console.log('use effect called');
  }, [specialistsRef, patientsRef]); 

  const [formData, setFormData] = useState({
    "doctor_id": -1,
    "patient_id": -1,
    "expiration_date": null 
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
    
    if (formData.doctor_id === -1) {
      alert('Plese select a specialist');
      return;
    }

    if (formData.patient_id === -1) {
      alert('Please select a patient');
      return;
    }
    
    const referralData = {
      doctor_id: formData.doctor_id,
      patient_id: formData.patient_id,
      expiration_date: formData.expiration_date.toISOString().slice(0, 10)
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(referralData)
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/create_referral`, requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(data);

        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        alert(data.message);

        nav('/doctor', {});
      });
    });
  };

  return(
    <div className="login-page">
      <form className="form" onSubmit={handleSubmit}>

        <label className="d-flex justify-content-center text-secondary">Specialist:</label>    
        <select
          name="doctor_id"
          value={formData.doctor_id}
          onChange={handleInputChange}
          defaultValue={-1}
          required
          >
          <option key={0} value={-1} disabled>Select a specialist</option>
          {specialists.map(specialist => (
            <option key={specialist.employee_id} value={specialist.employee_id}>Dr. {specialist.first_name} {specialist.last_name}</option>
          ))}
        </select>

        <label className="d-flex justify-content-center text-secondary">Patient:</label>
        <select 
          name="patient_id"
          value={formData.patient_id}
          onChange={handleInputChange}
          defaultValue={-1}
          required >
          <option key={0} value={-1} disabled>Select one of your patients</option>
          {patients.map(patient => (
            <option key={patient.patient_id} value={patient.patient_id}>{patient.patient_fname} {patient.patient_lname}</option>
          ))}
        </select>

        <label className="d-flex text-secondary">Referral valid through:</label>
        <DatePicker 
          name="date"
          selected={formData.expiration_date}
          onChange={expiration_date => setFormData({ ...formData, expiration_date })}
          dateFormat="yyyy-MM-dd"
          showIcon
          toggleCalendarOnIconClick
          required />     

        <button className="submit-button" type="submit">Refer Patient</button>
      </form>
    </div>
  );
}

export default ReferralsForm;
