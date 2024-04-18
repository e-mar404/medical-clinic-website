import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MedicationForm from './MedicationForm.js';
import SetPrimaryDoctor from './SetPrimaryDoctor.js';

function MedicalHistoryForm() {
  const { patient_id } = useParams();

  const [patientMedicalHistory, setPatientMedicalHistory] = useState({'conditions': '', 'allergies': '', 'family_history': '', 'patient_id': patient_id });
  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/history_for_patient/${patient_id}`, requestOptions).then((response) => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        setPatientMedicalHistory({
          ...data.message,
          'patient_id': patient_id
        });
      });
    });

  }, [patient_id]);

  const updatePatientMedicalHistory = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientMedicalHistory)
    };

    console.log(requestOptions);

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/update_patient_medical_history`, requestOptions).then((response) => {
      response.json().then((data) => {

        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        alert(data.message);
      });
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setPatientMedicalHistory({
      ...patientMedicalHistory,
      [name]: value || '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePatientMedicalHistory();
  };

  return (
    <>
      <form id="ProfileForm" className="form-control m-4 w-auto" onSubmit={handleSubmit}>
        <span className="h4 m-0">Patient History for {patient_id}</span>

        <div className="col">
          <div className="mr ml">
            <label>Name</label>
            <input type="text" className="form-control" id="FullName" placeholder="Patient Name" readOnly />
          </div>
        </div>

        <div className="col">
          <div className="mr ml">
            <label>Conditions</label>
            <input 
              type="text"
              className="form-control"
              id="MedicalConditions"
              name="conditions"
              placeholder="Medical Conditions"
              defaultValue={patientMedicalHistory.conditions} 
              onChange={handleInputChange}/>
          </div>
        </div>

        <div className="col">
          <div className="mr ml">
            <label>Allergies</label>
            <input 
              type="text"
              className="form-control"
              id="MedicalConditions"
              name="allergies"
              placeholder="Allergies"
              defaultValue={patientMedicalHistory.allergies} 
              onChange={handleInputChange}/>
          </div>
        </div>

        <div className="col">
          <div className="mr ml">
            <label>Family History</label>
            <input 
              type="text"
              className="form-control"
              id="MedicalConditions"
              name="family_history"
              placeholder="Family History"
              defaultValue={patientMedicalHistory.family_history} 
              onChange={handleInputChange}/>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-primary btn float-end" id="SaveProfile">Save History</button>
          </div>
        </div>
      </form>
      
      <MedicationForm patient_id={patient_id} doctor_id={localStorage.getItem('UserId')} />
      
      <SetPrimaryDoctor patient_id={patient_id} /> 
    </>
  );
}

export default MedicalHistoryForm;
