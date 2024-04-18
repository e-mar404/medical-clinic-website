import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

function PatientProfile() {
  const [thisPatient, setThisPatient] = useState(
    {
      "patient_id": 0,
      "phone_number": "",
      "address": "",
      "email_address": "",
      "first_name": "",
      "last_name": "",
      "date_of_birth": "",
      "primary_doctor_id": 0,
      "gender": "",
      "doctor_first_name": "",
      "doctor_last_name": ""
    });

  useEffect(() => {
    const getMethod = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const fetchProfile = async () => {
      const patient_id = localStorage.getItem("UserId");

      fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/profile/${patient_id}`, getMethod).then((response) => {
        response.json().then((data) => {
          if (response.status !== 200) {
            alert(data.error);
            return;
          }
          setThisPatient(data.message[0]);
          
        });
      });
    }

    fetchProfile();
  }, []);

  const saveFunction = (e) => {  
    const postMethod = {
      method: 'POST',
      redirect: 'follow',
      headers: { 
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      },
      body: JSON.stringify({
        'patient_id': document.querySelector('#PatientID').value,
        'email_address': document.querySelector('#EmailAddress').value,
        'phone_number': document.querySelector('#PhoneNumber').value,    
        "address": document.querySelector('#Address').value,
      })
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/profile`, postMethod).then((response) => {
      response.json().then((data) => {
        if (response.status === 200) {
          alert("Saved patient profile!");
          console.log(data);
        }
        else {
          alert("something broke");
        }
      });
    });
  }

  return (
    <>
      <Navbar />
      <div className="container-md mx-auto">
        <div className="row mt-3">
          <div className="col-12">
            <ul className="nav nav-tabs" id="NavHeader">
              <li className="nav-item">
                <a className="nav-link active" id="Profile" href="/patient/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="Financial" href="/patient/financial">Financial</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="Emergency" href="/patient/emergency_contacts">Emergency</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="Insurance" href="/patient/insurance">Insurance</a>
              </li>
            </ul>
          </div>
        </div>

        <form id="ProfileForm">
          <div className="row mt-3">
            <span className="h4 m-0">Patient Profile</span>
            <div className="row mt-3">
              <div className="col-6">
                <div className="mr-3 ml-3">
                  <label>Name</label>
                  <input type="text" className="form-control mt-1" id="FullName" value={`${thisPatient.first_name} ${thisPatient.last_name}`} readOnly />
                </div>
              </div>
              <div className="col-6">
                <div className="mr-3 ml-3">
                  <label>Email Address</label>
                  <input type="text" className="form-control mt-1" id="EmailAddress" value={`${thisPatient.email_address}`} readOnly />
                </div>
              </div>
            </div>
            <div className="row mt-3">
            <div className="col-3">
                <div className="mr-3 ml-3">
                  <label>Date of Birth</label>
                  <input type="text" className="form-control mt-1" id="DateOfBirth" value={thisPatient.date_of_birth === null ? "" : thisPatient.date_of_birth.slice(0, 10)} readOnly />
                </div>
              </div>
              <div className="col-3">
                <div className="mr-3 ml-3">
                  <label>Gender</label>
                  <input type="text" className="form-control mt-1" id="Gender" value={thisPatient.gender === null ? "" : thisPatient.gender} readOnly />
                </div>
              </div>
              <div className="col-6">
                <div className="mr-3 ml-3">
                  <label>Primary Doctor</label>
                  <input type="text" className="form-control mt-1" id="PrimaryDoctor" value={thisPatient.primary_doctor_id === null ? "No primary doctor assigned" : thisPatient.doctor_first_name + " " + thisPatient.doctor_last_name} readOnly />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <div className="mr-3 ml-3">
                  <label>Phone Number</label>
                  <input type="text" className="form-control mt-1" id="PhoneNumber" defaultValue={thisPatient.phone_number === null ? "" : thisPatient.phone_number} />
                </div>
              </div>
              <div className="col-3">
                <div className="mr-3 ml-3">
                  <label>Home Address</label>
                  <input type="text" className="form-control mt-1" id="Address" defaultValue={thisPatient.address === null ? "" : thisPatient.address} />
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="row mt-3">
          <div className="col-12">
            <button type="button" className="btn btn-primary btn float-end mt-3" id="SaveButton" onClick={saveFunction}>Save Changes</button>
          </div>
        </div>

      </div>

    </>
  );
}

export default PatientProfile;
