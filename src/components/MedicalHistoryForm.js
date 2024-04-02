import { useState, useEffect, useRef } from 'react';

function MedicalHistoryForm({ patient_id }) {
  const [patientMedicalHistory, setPatientMedicalHistory] = useState({});
  const patientMedicalHistoryRef = useRef();
  
  useEffect(() => {
    console.log(`fetching medical history for patient ${patient_id}`);

  }, [patientMedicalHistoryRef, patient_id]);

  return (
    <>
      <form id="ProfileForm">
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
            <input type="text" className="form-control" id="MedicalConditions" placeholder="Medical Conditions" readOnly />
          </div>
        </div>

        <div className="col">
          <div className="mr ml">
            <label>Allergies</label>
            <input type="text" className="form-control" id="Allergies" placeholder="Allergies" readOnly />
          </div>
        </div>

        <div className="col">
          <div className="mr ml">
            <label>Family History</label>
            <input type="text" className="form-control" id="FamilyHistory" placeholder="Family History" readOnly />
          </div>
        </div>

        <div className="col">
          <div className="mr ml">
            <label>Prescribe Medications</label>
            <input type="text" className="form-control" id="PresribeMedicaions" placeholder="Prescribe Medications" readOnly />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-primary btn float-end" id="SaveProfile">Save History</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default MedicalHistoryForm;
