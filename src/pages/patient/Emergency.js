//import { useEffect } from 'react';
import Navbar from '../../components/Navbar';

function PatientEmergency() {
  return (
    <>
      <Navbar />
      <div className="container-md mx-auto">
      <div className="row mt-3">
          <div className="col-12">
            <ul className="nav nav-tabs" id="NavHeader">
              <li className="nav-item">
                <a className="nav-link" id="Profile" href="/patient/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="Financial" href="/patient/financial">Financial</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" id="Emergency" href="/patient/emergency_contacts">Emergency</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="Insurance" href="/patient/insurance">Insurance</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}

export default PatientEmergency;
