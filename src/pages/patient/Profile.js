import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// instead of giving each nav button its own page, i'm gonna just make it re-render the page with the correct form
const displayForm = (element) => {

  const buttonIds = ['#Profile', '#Financial', '#Emergency', '#Insurance'];
  buttonIds.forEach(buttonId => {
    const button = document.querySelector(buttonId);
    if (button) {
      button.classList.remove('active');
    }
  })

  const formIds = ['#ProfileForm', '#FinancialForm', '#EmergencyForm', '#InsuranceForm'];
  formIds.forEach(formId => {
    const form = document.querySelector(formId);
    if (form) {
      form.classList.add('d-none');
    }
  });

  document.querySelector(`#${element}`).classList.add('active');
  document.querySelector(`#${element}Form`).classList.remove('d-none');
}

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
      "name_on_card": "",
      "card_number": "",
      "cvv": "",
      "expiration_date": "",
      "contact_name": "",
      "contact_number": "",
      "contact_relationship": "",
      "policy_number": "",
      "group_number": ""
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
    var regExp = /[a-zA-Z]/g;
    if (document.querySelector('#ExpirationDate').value.length > 0 & (document.querySelector('#ExpirationDate').value.length !== 5 || !document.querySelector('#ExpirationDate').value.includes('/') || regExp.test(document.querySelector('#ExpirationDate').value))) {
      alert("Please enter valid input for Expiration Date!");
      return;
    }
  
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
        "name_on_card": document.querySelector('#NameOnCard').value,
        "card_number": document.querySelector('#CardNumber').value,
        "cvv": document.querySelector('#CVV').value,
        "expiration_date": document.querySelector('#ExpirationDate').value,
        "contact_name": document.querySelector('#EmergencyName').value,
        "contact_number": document.querySelector('#EmergencyNumber').value,
        "contact_relationship": document.querySelector('#EmergencyRelationship').value,
        "policy_number": document.querySelector('#PolicyNumber').value,
        "group_number": document.querySelector('#GroupNumber').value 
      })
    };

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/profile`, postMethod).then((response) => {
      response.json().then((data) => {

        if (response.status === 200) {
          alert("Saved!");
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
      <div class="container-md mx-auto">
        <div class="row mt-3">
          <div class="col-12">
            <ul class="nav nav-tabs" id="NavHeader">
              <li class="nav-item">
                <button class="nav-link active" id="Profile" onClick={(event) => displayForm(event.target.id)}>Profile</button>
              </li>
              <li class="nav-item">
                <button class="nav-link" id="Financial" onClick={(event) => displayForm(event.target.id)}>Financial</button>
              </li>
              <li class="nav-item">
                <button class="nav-link" id="Emergency" onClick={(event) => displayForm(event.target.id)}>Emergency</button>
              </li>
              <li class="nav-item">
                <button class="nav-link" id="Insurance" onClick={(event) => displayForm(event.target.id)}>Insurance</button>
              </li>
            </ul>
          </div>
        </div>

        <form id="ProfileForm">
          <div class="row mt-3">
            <span class="h4 m-0">Patient Profile</span>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Name</label>
                  <input type="text" class="form-control mt-1" id="FullName" value={`${thisPatient.first_name} ${thisPatient.last_name}`} readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Email Address</label>
                  <input type="text" class="form-control mt-1" id="EmailAddress" value={`${thisPatient.email_address}`} readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Patient ID Number</label>
                  <input type="text" class="form-control mt-1" id="PatientID" value={`${thisPatient.patient_id}`} readOnly />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Date of Birth</label>
                  <input type="text" class="form-control mt-1" id="DateOfBirth" value={thisPatient.date_of_birth === null ? "" : thisPatient.date_of_birth} readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Gender</label>
                  <input type="text" class="form-control mt-1" id="Gender" value={thisPatient.gender === null ? "" : thisPatient.gender} readOnly />
                </div>
              </div>
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Primary Doctor</label>
                  <input type="text" class="form-control mt-1" id="PrimaryDoctor" value={thisPatient.primary_doctor_id === null ? "" : thisPatient.primary_doctor_id} readOnly />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Phone Number</label>
                  <input type="text" class="form-control mt-1" id="PhoneNumber" defaultValue={thisPatient.phone_number === null ? "" : thisPatient.phone_number} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Home Address</label>
                  <input type="text" class="form-control mt-1" id="Address" defaultValue={thisPatient.address === null ? "" : thisPatient.address} />
                </div>
              </div>
            </div>
          </div>
        </form>

        <form id="FinancialForm" class="d-none">
          <div class="row mt-3">
            <span class="h4 m-0">Financial</span>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Name on Card</label>
                  <input type="text" class="form-control mt-1" id="NameOnCard" defaultValue={thisPatient.name_on_card === null ? "" : thisPatient.name_on_card} />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Card Number</label>
                  <input type="text" class="form-control mt-1" id="CardNumber" defaultValue={thisPatient.card_number === null ? "" : thisPatient.card_number} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>CVV</label>
                  <input type="text" class="form-control mt-1" id="CVV" defaultValue={thisPatient.cvv === null ? "" : thisPatient.cvv} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Expiration Date (MM/YY)</label>
                  <input type="text" class="form-control mt-1" id="ExpirationDate" defaultValue={thisPatient.expiration_date === null ? "" : thisPatient.expiration_date} />
                </div>
              </div>
            </div>
          </div>
        </form>

        <form id="EmergencyForm" class="d-none">
          <div class="row mt-3">
            <span class="h4 m-0">Emergency Contact</span>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Contact Name</label>
                  <input type="text" class="form-control mt-1" id="EmergencyName" defaultValue={thisPatient.contact_name === null ? "" : thisPatient.contact_name} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Relationship</label>
                  <input type="text" class="form-control mt-1" id="EmergencyRelationship" defaultValue={thisPatient.contact_relationship === null ? "" : thisPatient.contact_relationship} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Number</label>
                  <input type="text" class="form-control mt-1" id="EmergencyNumber" defaultValue={thisPatient.contact_number === null ? "" : thisPatient.contact_number} />
                </div>
              </div>
            </div>
          </div>
        </form>

        <form id="InsuranceForm" class="d-none">
          <div class="row mt-3">
            <span class="h4 m-0">Insurance</span>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Policy Number</label>
                  <input type="text" class="form-control mt-1" id="PolicyNumber" defaultValue={thisPatient.policy_number === null ? "" : thisPatient.policy_number} />
                </div>
              </div>
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Group Number</label>
                  <input type="text" class="form-control mt-1" id="GroupNumber" defaultValue={thisPatient.group_number === null ? "" : thisPatient.group_number} />
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="row mt-3">
          <div class="col-12">
            <button type="button" class="btn btn-primary btn float-end mt-3" id="SaveButton" onClick={saveFunction}>Save Changes</button>
          </div>
        </div>

      </div>


      <Footer />
    </>
  );
}

export default PatientProfile;
