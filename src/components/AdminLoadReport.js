import React from "react";

function AdminLoadReports(){

    return(
        <>
        <h1>Clinic Name</h1>
        <p>User accounts created from start date to end date: # of users</p>
        <div className="container">

        <table className="table table-stripped" style={{ width: 100+ 'em'}}>
        <thead>
            <tr>
            <th>Patient First Name</th>
            <th>Patient Last Name</th>
            <th>Doctor First Name</th>
            <th>Doctor Last Name</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            </tr>
        </thead>
        <tbody>

            
            <tr>
            <td>Patient first_name</td>
            <td>Patient first_name</td>
            <td>Doctor first_name</td>
            <td>Doctor first_name</td>
            <td>Doctor first_name</td>
            <td>Doctor first_name</td>
            </tr>
        
        </tbody>
        </table>
        </div>

        </>
    );
}

export default AdminLoadReports;