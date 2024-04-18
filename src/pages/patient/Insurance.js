import { useEffect } from 'react';
import Navbar from '../../components/Navbar';

function PatienceInsurance() {
    useEffect(() => {
        const getMethod = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
    
        const fetchInsurance = async () => {
          const patient_id = localStorage.getItem("UserId");
    
          fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/insurance/${patient_id}`, getMethod).then((response) => {
            response.json().then((data) => {
              if (response.status !== 200) {
                alert(data.error);
                return;
              }
              if (data.message.length > 0) {
                document.querySelector("#GroupNumber").value = data.message[0].group_number;
                document.querySelector("#PolicyNumber").value = data.message[0].policy_number;  
              }
            });
          });
        }
    
        fetchInsurance();
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
            'patient_id': localStorage.getItem("UserId"),
            'group_number': document.querySelector('#GroupNumber').value,
            'policy_number': document.querySelector('#PolicyNumber').value,    
          })
        };
    
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/insurance`, postMethod).then((response) => {
          response.json().then((data) => {
            if (response.status === 200) {
              alert("Saved patient insurance!");
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
                <a className="nav-link" id="Profile" href="/patient/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="Financial" href="/patient/financial">Financial</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="Emergency" href="/patient/emergency_contacts">Emergency</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" id="Insurance" href="/patient/insurance">Insurance</a>
              </li>
            </ul>
          </div>
        </div>

        <form id="InsuranceForm">
          <div className="row mt-3">
            <span className="h4 m-0">Insurance Information</span>
            <div className="row mt-3">
              <div className="col-6">
                <div className="mr-3 ml-3">
                  <label>Group Number</label>
                  <input type="text" className="form-control mt-1" id="GroupNumber" />
                </div>
              </div>
              <div className="col-6">
                <div className="mr-3 ml-3">
                  <label>Policy Number</label>
                  <input type="text" className="form-control mt-1" id="PolicyNumber" />
                </div>
              </div>
            </div>
          </div>
        </form>
        
        <div className="row mt-3">
          <div className="col-12">
            <button type="button" className="btn btn-primary btn float-end mt-3" id="SaveButton" onClick={(e)=>saveFunction()}>Save Changes</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default PatienceInsurance;
