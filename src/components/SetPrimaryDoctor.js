import { useState, useEffect, useRef } from 'react';

export default function SetPrimaryDoctor({ patient_id }) {
  const [doctors, setDoctors] = useState([{'employee_id': 0, 'first_name': '', 'last_name': ''}]);
  const [primaryDoctor, setPrimaryDoctor] = useState([{'employee_id': 0, 'first_name': '', 'last_name': ''}]);
  const [newPrimaryDoctor, setNewPrimaryDoctor] = useState(0);
  
  const handleInputChange = (e) => {
    const { value } = e.target;

    setNewPrimaryDoctor(doctors[value - 1].employee_id);
  };

  const getRequestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'text/plain' }
  };

  const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }
  };

  const fetchDoctors= () => {
    fetch(`${process.env.REACT_APP_BACKEND_HOST}/employee/bytype/primary_doctor`, getRequestOptions).then((response) => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        setDoctors(data.message);
      });
    });
  }

  const fetchPrimaryDoctor = () => {
    fetch(`${process.env.REACT_APP_BACKEND_HOST}/primary_doctor_for_patient/${patient_id}`, getRequestOptions).then((response) => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        setPrimaryDoctor(data.message);
      });
    });
  };

  const updatePrimaryDoctor = () => {
    postRequestOptions.body = JSON.stringify(
      {
        'patient_id': patient_id,
        'primary_doctor_id': newPrimaryDoctor
      });

    console.log(postRequestOptions);

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/update_primary_doctor`, postRequestOptions).then((response) => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        alert(data.message);
      });
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`new primary doctor ${newPrimaryDoctor}`);

    updatePrimaryDoctor();
    window.location.reload();
  };
  
  const fetchDoctorsRef= useRef(fetchDoctors);
  const fetchPrimaryDoctorRef= useRef(fetchPrimaryDoctor);

  useEffect(() => {
    console.log('use effect called');
    fetchPrimaryDoctorRef.current();
    fetchDoctorsRef.current();
  }, [fetchPrimaryDoctorRef, fetchDoctorsRef]);

  return (
    <>
      <form id="MedicationForm" className="form-control m-4 w-auto" onSubmit={handleSubmit}> 
        <h3>Primary Doctor For Patient: Dr. {primaryDoctor[0].first_name} {primaryDoctor[0].last_name}</h3>
        
        <label className="d-flex">Set new primary doctor:</label>
        <select
          name="doctor_id"
          defaultValue={-1}
          onChange={handleInputChange}
          required
          >
          <option key={0} name='default' value={-1} disabled>Change primary doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.employee_id} name='doctor' value={doctor.employee_id}>{`Dr. ${doctor.first_name} ${doctor.last_name}`}</option>
            ))}
        </select>

        <div className="col-md-1 mt-2 d-grid gap-2 d-md-flex">
          <button type="submit" className="btn btn-sms btn-primary">Save</button>
        </div>
      </form>
    </>
  );
}
