import React, { useState } from "react";
import DatePicker from 'react-datepicker';

function AdminReports(){
    const[showTable, setTable] = useState(false);
    const [userAccounts, setUserAccounts] = useState([{'first_name':'first', 'last_name':'last', 'email_address':'email', 'created':''}]);
    const [appointments, setAppointments] = useState([{'employee_id':'test', 'first_name':'first','last_name':'last', 'total_appointment':''}]);
    const [formData, setFormData] = useState({
        reportId:-1, // 1 is for new users created ,  2 is for doctor and their appointments, 3 is a work in progress
        startDate: null,
        endDate: null,
    });
    const admin_id = localStorage.getItem("UserEmail");
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //console.log(name, value);
        if(name === 'reportId'){
            setTable(false);
        }
            setFormData({
                ...formData,
                [name]: value,
            })
        //console.log(formData);
    };

    const handleSubmit = (e) => {
        //console.log('handleSubmit clicked');
        e.preventDefault();

        const formatDate ={
            reportId: formData.reportId, // 1 is for new users created ,  2 is for doctor and their appointments, 3 is TBD
            startDate: formData.startDate.toISOString().slice(0, 10),
            endDate: formData.endDate.toISOString().slice(0, 10),
        };
        //console.log(formatDate);
        
        // get the clinic id before i send in the info and add that to query 
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        let clinic_id;
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/getAdminClinic/${admin_id}`, requestOptions).then((response) => {
            response.json().then((data) => {
            if(response.status !== 200){
              alert(data.error);
              return;
            }
            clinic_id = data.message[0].primary_clinic;
            //console.log(clinic_id);
        
        //console.log(`checking the reportId ${formatDate.reportId} and clinic id ${clinic_id}`);
        if(formData.reportId === '1'){
            //console.log(`in the if statement of reportId ${formatDate.reportId}`);
        
            //console.log(`fetch is called with ${formatDate.startDate} and ${formatDate.endDate}`);
                fetch(`${process.env.REACT_APP_BACKEND_HOST}/accounts_created/${formatDate.startDate}/${formatDate.endDate}/${clinic_id}`, requestOptions).then((response) =>{
                    response.json().then((data) => {
                        if(response.status !== 200){
                            alert(data.error);
                            return;
                        }
                        //console.log(data.message);
                        //setUserAccounts(data.message);

                        const fixDate = data.message.map(account => ({
                            ...account,
                            created: account.created.split('T')[0],
                            
                          }));
                          
                        setUserAccounts(fixDate);
                        
                        setTable(true);
                    });
                });
        }
        else if(formData.reportId === '2'){
            //console.log(`in the else statement of reportId ${formatDate.reportId}`);
            //console.log(`in the if else statement of reportId ${formatDate.reportId}`);
        
            //console.log(`fetch is called with ${formatDate.startDate} and ${formatDate.endDate}`);
                fetch(`${process.env.REACT_APP_BACKEND_HOST}/doctor_total/${formatDate.startDate}/${formatDate.endDate}/${clinic_id}`, requestOptions).then((response) =>{
                    response.json().then((data) => {
                        if(response.status !== 200){
                            alert(data.error);
                            return;
                        }
                        console.log(data.message);
                        setAppointments(data.message);
                        
                        setTable(true);
                    });
                });
        }
        else if(formData.reportId === '3'){
            
            console.log(`in the if else statement of reportId ${formatDate.reportId}`);
        }
        else{
            alert('Please choose valid report');
            return;
        }
        });
        });
    };
    
    function reportOne(){
        
        return(
            <>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAccounts.map((user, index) => (
                            <tr key={index}>
                                <td>{`${user.first_name}`}</td>
                                <td>{`${user.last_name}`}</td>
                                <td>{`${user.email_address}`}</td>
                                <td>{`${user.created}`}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </>
        );
    }

    function reportTwo(){
        return(
            <>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Total Appointments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((user, index) => (
                            <tr key={index}>
                                <td>{`${user.employee_id}`}</td>
                                <td>{`${user.first_name}`}</td>
                                <td>{`${user.last_name}`}</td>
                                <td>{`${user.total_appointment}`}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </>
        );
    }

    return(
      <>
        
            <form className="form-control m-4 w-auto">
            
            <span className="h4 m-0">Reports</span>
                <div className="report">
                    <label>Report Type</label>
                
                    <select className="form-control"
                        name="reportId"
                        value = {formData.reportId}
                        onChange={handleInputChange}
                        required
                        //UNDER THIS SELECT THERE WILL BE A TOGGLEBLE (idk??) SELECTION WHICH IS ONLY AVAILABLE WHEN WE SELECT THE DOCTOR
                    >
                        <option value="" defaultValue>Select Report Type</option>
                        <option value="1">New User Accounts Created</option>
                        <option value="2">Appointments For Doctor</option>
                        <option value="3">Other Report</option>
                    </select>
                
                    <label>Start Date: (yyyy-mm-dd)</label>
                    <DatePicker 
                        name="startDate"
                        dateFormat="yyyy-MM-dd"
                        showIcon
                        toggleCalendarOnIconClick
                        required
                        selected={formData.startDate}
                        onChange={(startDate) => setFormData({...formData, startDate})}
                    />
                
                    <label>End Date: (yyyy-mm-dd)</label>
                    <DatePicker 
                        name="endDate"
                        dateFormat="yyyy-MM-dd"
                        showIcon
                        toggleCalendarOnIconClick
                        required
                        selected={formData.endDate}
                        onChange={(endDate) => setFormData({...formData, endDate})}
                    />

                    <div className="row">  
                        <div className="col">
                            <button className="btn btn-primary btn float-end" type="button" onClick={handleSubmit}>Generate</button>
                        </div>
                    </div>

              </div>
                { formData.reportId === '1' && showTable && reportOne()}
                { formData.reportId === '2' && showTable && reportTwo()}
           </form>
        
    </>
    );
}

export default AdminReports; 
