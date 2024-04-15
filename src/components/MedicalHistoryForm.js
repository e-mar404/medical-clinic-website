import { useState, useEffect, useRef } from 'react';
import PrescribeMedicationForm from './PrescribeMedicationForm.js';

function MedicalHistoryForm({ patient_id }) {
  const [patientMedicalHistory, setPatientMedicalHistory] = useState({'conditions': '', 'allergies': '', 'family_history': '', 'patient_id': patient_id });
  const patientMedicalHistoryRef = useRef();
  
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
          'patient_id':patient_id
        });
      });
    });

  }, [patientMedicalHistoryRef, patient_id]);

  const updatePatientMedicalHistory = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientMedicalHistory)
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/update_patient_medical_history`, requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(data);

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

    setPatientMedicalHistory({
      ...patientMedicalHistory,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(patientMedicalHistory);

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
            <input type="text" className="form-control" id="MedicalConditions" name="conditions" placeholder="Medical Conditions" defaultValue={patientMedicalHistory.conditions} onChange={handleInputChange}/>
          </div>
        </div>

        <div className="col">
          <div className="mr ml">
            <label>Allergies</label>
            <input type="text" className="form-control" id="Allergies" defaultValue={patientMedicalHistory.allergies} />
          </div>
        </div>

        <div className="col">
          <div className="mr ml">
            <label>Family History</label>
            <input type="text" className="form-control" id="FamilyHistory" defaultValue={patientMedicalHistory.family_history}/>
          </div>
        </div>


        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-primary btn float-end" id="SaveProfile">Save History</button>
          </div>
        </div>
      </form>
      
      <PrescribeMedicationForm />
    </>
  );
}

export default MedicalHistoryForm;
