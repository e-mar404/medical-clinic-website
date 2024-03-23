import React, { useState, useEffect } from "react";
import './DisplayEmployee.css'

function DisplayEmployee(){
    const [employees, setEmployee] = useState([])
    const [type, setType] = useState('');
  
    
    useEffect(() => {
      setType('all');
      fetch('/employee/bytype/medical').then((response) => {
        response.json().then( data => {
          console.log(data);
        }
      )
      })
    }, []); 

    return(
        <>
            <div className="container">
              <table className="table table-stripped" style={{ width: 118 + 'em'}}>
                <thead>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                </thead>
                <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                    <td>{employee.first_name}</td>
                    <td>employee.last_name</td>
                    <td>employee.role</td>
                    <td>
                    <p className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More options
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                        <li><a className="dropdown-item" href="/admin/viewappointment">View Appointments</a></li>
                        <li><a className="dropdown-item" href="/admin/transfer">Transfer</a></li>

                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="/">Terminate</a></li>
                      </ul>
                      </p>
                    </td>
                  </tr>

                  ))}
                
                </tbody>
              </table>
            </div>
        </>
    );
}

//need a list for the the other actions
export default DisplayEmployee;
