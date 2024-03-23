import React from "react";
import './DisplayEmployee.css'

function DisplayEmployee(){
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
                  <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Role</td>
                    <td>
                    <p className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More options
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="/admin/viewappointment">View Appointments</a></li>
                        <li><a className="dropdown-item" href="/admin/transfer">Transfer</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Terminate</a></li>
                      </ul>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Role</td>
                    <td>
                    <p className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More options
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">View Appointments</a></li>
                        <li><a className="dropdown-item" href="#">Transfer</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Terminate</a></li>
                      </ul>
                      </p>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
        </>
    );
}

//need a list for the the other actions
export default DisplayEmployee;