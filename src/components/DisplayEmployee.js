import React, { useState, useEffect, useRef } from "react";
import './DisplayEmployee.css'

function DisplayEmployee(){
    const [employees, setEmployee] = useState([{"employee_id": 1, "first_name": "test", "last_name":"test", "employee_role":1}]);
    //const [type, setType] = useState([{"type": "all"}]);
    const employeesRef = useRef(employees);
    //setType("all");
    //console.log(`${type}`);


    useEffect(() => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
  
      const fetchDoctors = async () => {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/employee/bytype/medical`, requestOptions).then((response) => {
          response.json().then((data) => {
            if (response.status !== 200) {
              alert(data.error);
              return;
  
            }
  
            employeesRef.current = data.message;
            setEmployee(data.message);
          });
        });
  
      }
  
      fetchDoctors();
      console.log('use effect called');
    }, [employeesRef]); 

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

                        <li><a className="dropdown-item" href="/admin/viewappointment">View Appointments</a></li>
                        <li><a className="dropdown-item" href="/admin/transfer">Transfer</a></li>

                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="/">Terminate</a></li>
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

//need a list for the the other actions
export default DisplayEmployee;
