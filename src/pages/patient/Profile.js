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
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const fetchProfile = async () => {
      const patient_id = localStorage.getItem("UserId");

      fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/profile/${patient_id}`, requestOptions).then((response) => {
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
                  <input type="text" class="form-control mt-1" id="FullName" placeholder={`${thisPatient.first_name} ${thisPatient.last_name}`} readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Email Address</label>
                  <input type="text" class="form-control mt-1" id="EmailAddress" placeholder={`${thisPatient.email_address}`} readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Patient ID Number</label>
                  <input type="text" class="form-control mt-1" id="PatientID" placeholder={`${thisPatient.patient_id}`} readOnly />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Date of Birth</label>
                  <input type="text" class="form-control mt-1" id="DateOfBirth" placeholder={`${thisPatient.date_of_birth}`} readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Gender</label>
                  <input type="text" class="form-control mt-1" id="Gender" placeholder={`${thisPatient.gender}`} readOnly />
                </div>
              </div>
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Primary Doctor</label>
                  <input type="text" class="form-control mt-1" id="PrimaryDoctor" placeholder={`${thisPatient.primary_doctor_id}`} readOnly />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Phone Number</label>
                  <input type="text" class="form-control mt-1" id="PhoneNumber" placeholder={`${thisPatient.phone_number}`} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Home Address</label>
                  <input type="text" class="form-control mt-1" id="Address" placeholder={`${thisPatient.address}`} />
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
                  <input type="text" class="form-control mt-1" id="NameOnCard" placeholder={`${thisPatient.name_on_card}`} />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Card Number</label>
                  <input type="text" class="form-control mt-1" id="CardNumber" placeholder={`${thisPatient.card_number}`} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>CVV</label>
                  <input type="text" class="form-control mt-1" id="CVV" placeholder={`${thisPatient.cvv}`} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Expiration Date</label>
                  <input type="text" class="form-control mt-1" id="ExpirationDate" placeholder={`${thisPatient.expiration_date}`} />
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
                  <input type="text" class="form-control mt-1" id="EmergencyName" placeholder={`${thisPatient.contact_name}`} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Relationship</label>
                  <input type="text" class="form-control mt-1" id="Relationship" placeholder={`${thisPatient.contact_number}`} />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Number</label>
                  <input type="text" class="form-control mt-1" id="EmergencyNumber" placeholder={`${thisPatient.contact_number}`} />
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
                  <input type="text" class="form-control mt-1" id="PolicyNumber" placeholder={`${thisPatient.policy_number}`} />
                </div>
              </div>
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Group Number</label>
                  <input type="text" class="form-control mt-1" id="GroupNumber" placeholder={`${thisPatient.group_number}`} />
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="row mt-3">
          <div class="col-12">
            <button type="button" class="btn btn-primary btn float-end mt-3" id="SaveButton">Save Changes</button>
          </div>
        </div>

      </div>


      <Footer />
    </>
  );
}

export default PatientProfile;
