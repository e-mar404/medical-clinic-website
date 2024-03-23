import React from "react";
// import DisplayEmployee from "./DisplayEmployee";

function DisplayDoctorAppointment(){
    return(<>
    <div className="DoctorInfo">
      <h1>Doctor Info</h1>
      <div>
        <p>role</p>
        <p>primary clinic</p>
      </div>
    </div>
    
    
    
    <hr style={{width: 101 +'em', color:"black"}}/>
    <h2>Appointments</h2>
  
    <div className="container">

              <table className="table table-stripped" style={{ width: 100+ 'em'}}>
                <thead>
                    <th>Patient F Name</th>
                    <th>Patient L Name</th>
                    <th>Doctor F Name</th>
                    <th>Doctor L Name</th>
                    <th>Clinic Address</th>
                    <th>Type of Appointments</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>

                </thead>
                <tbody>
                  <tr>
                    <td>Patient F Name</td>
                    <td>Patient L Name</td>
                    <td>Doctor F Name</td>
                    <td>Doctor L Name</td>
                    <td>Clinic Name</td>
                    <td>Appointment Type</td>
                    <td>Appointment Date</td>
                    <td>Time</td>
                  </tr>
                </tbody>
              </table>
            </div>

    </>
    );
}
// map everything in the appointments to the table data 
// need icon 
export default DisplayDoctorAppointment;
