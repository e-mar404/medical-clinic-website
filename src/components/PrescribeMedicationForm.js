import React, { useState, useEffect, useRef } from 'react';

function PrescribeMedicationForm({ patient_id, doctor_id }) {
  const [medications, setMedications] = useState([]);
  const [message, setMessage] = useState('');
  const canPresribe = localStorage.getItem('UserType') === 'Doctor';

  const prescribeMedication = (medication) => {
    console.log(medication);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'patient_id': patient_id,
        'doctor_id': doctor_id,
        'medication_name': medication
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

  const getMedications = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    } 

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/medications_for_patient/${patient_id}`, requestOptions).then(response => {
      response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }
        console.log(data.message);
        
        setMessage(() => {
          if(data.message.includes('prescribed')) {
            return data.message;
          }

          setMedications(data.message);

          return '';
        });
      });
    });
  };
  
  const addMedication = () => {
    const newMedications = [...medications];

    newMedications.push({ id: medications.length + 1, medication_name: '' });

    if (newMedications.length > 0) {
      setMessage('');
    }
    setMedications(newMedications);
  };

  const removeMedication = (id) => {
    const medication = medications.filter(medication => medication.id === id);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'patient_id': patient_id,
        'doctor_id': doctor_id,
        'medication_name': medication[0].medication_name
      })
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/remove_medication`, requestOptions).then((response) => {
      response.json().then((data) => {
        console.log(data);
        if (response.status !== 200) {
          alert(data.error);
          return;
        }

        alert(data.message);
      });
    });

    const updatedMedications = medications.filter((medication) => medication.id !== id);

    if (updatedMedications.length === 0) {
      console.log('no medications');
      setMessage('Patient has no medications prescribed');
    }


    setMedications(updatedMedications);
  };

  const handleInputChange = (id, event) => {
    const { value } = event.target;

    const updatedMedications = medications.map((medication) =>
      medication.id === id ? { ...medication, 'medication_name': value } : medication
    );

    setMedications(updatedMedications);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    medications.forEach(medication => {
      if(medication.length < 1) {
        alert('Medication name not valid');
        return;
      }

      prescribeMedication(medication.medication_name);
    });
  };

  const getMedicationsRef = useRef(getMedications);

  useEffect(() => {
    getMedicationsRef.current();
  }, [getMedicationsRef]);

  return (
    <>
      <form id="ProfileForm" className="form-control m-4 w-auto" onSubmit={handleSubmit}>
        <h3>Prescribe Medications</h3>
        
        {message.includes('prescribed') && <p>{message}</p>}

        {medications && medications.map((medication) => (
          <div className="row mb-3" key={medication.id}>
            <div className="col-md-4">
              <label className="form-label">Medication Name</label>
                <input
                  type="text"
                  className="form-control"
                  id={medication.id}
                  name="name"
                  value={medication.medication_name}
                  onChange={(e) => handleInputChange(medication.id, e)}
                  required
                />
            </div>
      
          {canPresribe && <div className="col-md-1 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeMedication(medication.id)}
              >
                Remove
            </button>
            </div>}
          </div>
        ))}
      
        {canPresribe && <div className="row md-3">
          <div className="col-md-1 d-grid gap-2 d-md-flex">
            <button type="button" className="btn btn-sm btn-primary" onClick={addMedication}>Add Medication</button>
          </div>
      
          {!message.includes('prescribed') && 
            <div className="col-md-1 d-grid gap-2 d-md-flex">
              <button type="submit" className="btn btn-sm btn-success">Prescribe</button>
            </div>}
        </div>}
      </form>
    </>
  );
}

export default PrescribeMedicationForm;
