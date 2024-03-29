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
                  <input type="text" class="form-control mt-1" id="FullName" placeholder="John Pham" readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Email Address</label>
                  <input type="text" class="form-control mt-1" id="EmailAddress" placeholder="john@gmail.com" readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Patient ID Number</label>
                  <input type="text" class="form-control mt-1" id="PatientID" placeholder="1" readOnly />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Date of Birth</label>
                  <input type="text" class="form-control mt-1" id="DateOfBirth" placeholder="2001-12-11" readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Gender</label>
                  <input type="text" class="form-control mt-1" id="Gender" placeholder="M" readOnly />
                </div>
              </div>
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Primary Doctor</label>
                  <input type="text" class="form-control mt-1" id="PrimaryDoctor" placeholder="Emilio Marin M.D." readOnly />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Phone Number</label>
                  <input type="text" class="form-control mt-1" id="PhoneNumber" placeholder="" />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Home Address</label>
                  <input type="text" class="form-control mt-1" id="Address" placeholder="" />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <button type="button" class="btn btn-primary btn float-end mt-3" id="SaveProfile">Save Profile</button>
              </div>
            </div>
          </div>
        </form>

        <form id="FinancialForm">
          <div class="row mt-3">
            <span class="h4 m-0">Financial</span>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Name on Card</label>
                  <input type="text" class="form-control mt-1" id="NameOnCard" placeholder="" readOnly />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Card Number</label>
                  <input type="text" class="form-control mt-1" id="CardNumber" placeholder="" readOnly />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>CVV</label>
                  <input type="text" class="form-control mt-1" id="CVV" placeholder="" />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Expiration Date</label>
                  <input type="text" class="form-control mt-1" id="ExpirationDate" placeholder="" />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <button type="button" class="btn btn-primary btn float-end mt-3" id="SaveFinancial">Save Financial</button>
              </div>
            </div>
          </div>
        </form>

        <form id="EmergencyForm">
          <div class="row mt-3">
            <span class="h4 m-0">Emergency Contact</span>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Contact Name</label>
                  <input type="text" class="form-control mt-1" id="EmergencyName" placeholder="" />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Relationship</label>
                  <input type="text" class="form-control mt-1" id="Relationship" placeholder="" />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Number</label>
                  <input type="text" class="form-control mt-1" id="EmergencyNumber" placeholder="" />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <button type="button" class="btn btn-primary btn float-end mt-3" id="SaveEmergency">Save Emergency</button>
              </div>
            </div>
          </div>
        </form>
        <form id="InsuranceForm">
          <div class="row mt-3">
            <span class="h4 m-0">Insurance</span>
            <div class="row mt-3">
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Policy Number</label>
                  <input type="text" class="form-control mt-1" id="FullName" placeholder="" />
                </div>
              </div>
              <div class="col-6">
                <div class="mr-3 ml-3">
                  <label>Group Number</label>
                  <input type="text" class="form-control mt-1" id="FullName" placeholder="" />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <button type="button" class="btn btn-primary btn float-end mt-3" id="SaveInsurance">Save Insurance</button>
              </div>
            </div>
          </div>
        </form>
      </div>


      <Footer />
    </>
  );
}

export default PatientProfile;
