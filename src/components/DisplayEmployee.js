import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './DisplayEmployee.css';

function DisplayEmployee(){
  const [employees, setEmployee] = useState([{"employee_id": 1, "first_name": "test", "last_name":"test", "employee_role":1}]);

  const admin_id = localStorage.getItem("UserEmail");
  //const [admin_clinic, setAdminClinic] = useState([{"primary_clinic": 0}]);

  const fetchAdminClinic = () => { // ok we should have our admin's clinic
    const requestOptions = {
      method:'GET',
      headers: { 'Content-Type': 'application/json'}
    };
    fetch(`${process.env.REACT_APP_BACKEND_HOST}/getAdminClinic/${admin_id}`, requestOptions).then((response) => {
      response.json().then((data) => {

        if (response.status !== 200) {
          alert(data.error);
          return;
        }
        
        const clinic = (data.message[0].primary_clinic);
        //setAdminClinic(data.message[0].primary_clinic);
      
        console.log(`admin for clinic: ${clinic}`);

        const requestOptions = {
          method:'GET',
          headers: { 'Content-Type': 'application/json'}
        };
        
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/getClinicEmployees/${clinic}`, requestOptions).then((response) => {
          response.json().then((data) => {
            //console.log(`clinic id is currently set to ${admin_clinic}`);
            if (response.status !== 200) {
              alert(data.error);
              return;
            }
            //console.log(data.message);
            setEmployee(data.message);
            });
          });
        });
      });
    }
  
  
  const fetchAdminClinicRef = useRef(fetchAdminClinic);

  useEffect(() => {
    fetchAdminClinicRef.current();
  }, [fetchAdminClinicRef]); 
 



  const nav = useNavigate();
  function handleTransfer(employee_id){
    nav('transfer', {state: {employee_id}});
  }

  function handleClick(employee_id){
     nav(`viewappointment/${employee_id}`, {});
  }
    return(
        <div className="container">
              <table className="table table-stripped" style={{ width: 118 + 'em'}}>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>   
                {employees.map((employee) => (
                    <tr key={`${employee.employee_id}`}>
                    <td>{`${employee.first_name}`}</td>
                    <td>{`${employee.last_name}`}</td>
                    <td>{`${employee.employee_role}`}</td>
                    <td>
                    <div className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More options
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        { employee.employee_role === 'Doctor' &&
                        <span>
                        <li><button className="dropdown-item" onClick={() => handleClick(employee.employee_id)} href='/'>View Appointments</button></li>
                        <li><button className="dropdown-item" onClick={() => handleTransfer(employee.employee_id)} href='/'>Transfer</button></li>
                        </span>}

                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="/admin/employeelist/newemployee">Terminate</a></li>
                      </ul>
                      </div>
                    </td>
                  </tr>

                  ))}
                
                </tbody>
              </table>
            </div>
    );
}

export default DisplayEmployee;

