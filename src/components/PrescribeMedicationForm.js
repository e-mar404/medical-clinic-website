import React, { useState } from 'react';

function PrescribeMedicationForm() {
  const [medications, setMedications] = useState([]);
  
  const prescribeMedication = (medication) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'patient_id': 1,
        'doctor_id': 1,
        'medication_name': medication,
        'num_refills': 1 
      })
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/prescribe_medication`, requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(data);
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        alert(data.message);
      });
    });
  };
  
  const addMedication = () => {
    const newMedications = [...medications];
    newMedications.push({ id: medications.length + 1, name: '' });
    setMedications(newMedications);
  };

  const removeMedication = (id) => {
    const updatedMedications = medications.filter((medication) => medication.id !== id);
    setMedications(updatedMedications);
  };

  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    const updatedMedications = medications.map((medication) =>
      medication.id === id ? { ...medication, [name]: value } : medication
    );
    setMedications(updatedMedications);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    medications.forEach(medication => {
      prescribeMedication(medication.name);
    });
  };

  return (
    <>
      <form id="ProfileForm" className="form-control m-4 w-auto" onSubmit={handleSubmit}>
        <h3>Prescribe Medications</h3>

        {medications && medications.map((medication) => (
          <div className="row mb-3" key={medication.id}>
            <div className="col-md-4">
              <label className="form-label">Medication Name</label>
                <input
                  type="text"
                  className="form-control"
                  id={medication.id}
                  name="name"
                  value={medication.name}
                  onChange={(e) => handleInputChange(medication.id, e)}
                  required
                />
            </div>
      
            <div className="col-md-1 d-flex align-items-end">
    
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeMedication(medication.id)}
              >
                Remove
            </button>
            </div>
          </div>
        ))}
      
        <div className="row md-3">
          <div className="col-md-1 d-grid gap-2 d-md-flex">
            <button type="button" className="btn btn-sm btn-primary" onClick={addMedication}>Add Medication</button>
          </div>
      
          <div className="col-md-1 d-grid gap-2 d-md-flex">
            <button type="submit" className="btn btn-sm btn-success">Prescribe</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default PrescribeMedicationForm;
