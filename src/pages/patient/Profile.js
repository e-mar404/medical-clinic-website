import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// instead of giving each nav button its own page, i'm gonna just make it re-render the page with the correct form
function PatientProfile() {
  return (
    <>
      <Navbar />
      <div class="container-md mx-auto">
        <div class="row mt-3">
          <div class="col-12">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active" href="#">Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Financial</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Emergency</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Insurance</a>
              </li>
            </ul>
          </div>
        </div>
        <form>
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
                  <input type="text" class="form-control mt-1" id="PhoneNumber" placeholder="000-000-0000" />
                </div>
              </div>
              <div class="col-3">
                <div class="mr-3 ml-3">
                  <label>Home Address</label>
                  <input type="text" class="form-control mt-1" id="Address" placeholder="University of Houston, Houston, TX" />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <button type="button" class="btn btn-primary btn float-end mt-3">Save Profile</button>
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
