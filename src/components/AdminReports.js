import React, { useState } from "react";
import DatePicker from 'react-datepicker';

function AdminReports(){
    const[showTable, setTable] = useState(false);
    const [userAccounts, setUserAccounts] = useState([{'first_name':'first', 'last_name':'last', 'email_address':'email', 'created':'', 'appointment_created':''}]);
    const [appointments, setAppointments] = useState([{'doctor_id':'test', 'first_name':'first','last_name':'last', 'total_appointment':''}]);
    const [revenue, setRevenue] = useState([{"total_amount":0}]);
    const [invoices, setInvoices] = useState([{"invoice_num": 0, "patient_id": 0, "last_name": "", "amount": "", "charge_type": "", "date_charged": ""}]);
    const [totalAccount, setTotalAccounts] = useState([{"total_accounts":0}]);
    const [totalAppointments, setTotalAppointments] = useState([{"total_appointments":0}]);
    //const [undefTest, setUndefTest] = useState(0);


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

        if(formData.startDate === null){
            alert("Please select a start date.")
            return;
        }

        if(formData.endDate === null){
            alert("Please select an end date.")
            return;
        }

        const formatDate ={
            reportId: formData.reportId, // 1 is for new users created ,  2 is for doctor and their appointments, 3 is revenue
            startDate: formData.startDate.toISOString().slice(0, 10),
            endDate: formData.endDate.toISOString().slice(0, 10),
        };

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
        
        if(formData.reportId === '1'){
  
                fetch(`${process.env.REACT_APP_BACKEND_HOST}/accounts_created/${formatDate.startDate}/${formatDate.endDate}/${clinic_id}`, requestOptions).then((response) =>{
                    response.json().then((data) => {
                        if(response.status !== 200){
                            alert(data.error);
                            return;
                        }
        

                        const fixDate = data.message.map(account => ({
                            ...account,
                            created: account.created.split('T')[0],
                            
                          }));
                          
                        setUserAccounts(fixDate);
                        fetch(`${process.env.REACT_APP_BACKEND_HOST}/new_account_total/${formatDate.startDate}/${formatDate.endDate}/${clinic_id}`, requestOptions).then((response) =>{
                            response.json().then((data) => {
                                if(response.status !== 200){
                                    alert(data.error);
                                    return;
                                }
                
                                  
                                setTotalAccounts(data.message);
                                
                                setTable(true);
                            });
                        });
                        
                        //setTable(true);
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

                        fetch(`${process.env.REACT_APP_BACKEND_HOST}/getTotalDoctor/${formatDate.startDate}/${formatDate.endDate}/${clinic_id}`, requestOptions).then((response) =>{
                            response.json().then((data) => {
                                if(response.status !== 200){
                                    alert(data.error);
                                    return;
                                }
                                console.log(data.message);
                                setTotalAppointments(data.message);
                                
                                setTable(true);
                            });
                        });
        
                    });
                });
        }
        else if(formData.reportId === '3'){
            fetch(`${process.env.REACT_APP_BACKEND_HOST}/getBillingReport/${clinic_id}/${formatDate.startDate}/${formatDate.endDate}`, requestOptions).then((response) =>{
                response.json().then((data) => {
                    if(response.status !== 200){
                        alert(data.error);
                        return;
                    }
                     // first fetch is entire revenue
                    setRevenue(data.message);
                    
                
                });
            });
            fetch(`${process.env.REACT_APP_BACKEND_HOST}/getInvoicesReport/${clinic_id}/${formatDate.startDate}/${formatDate.endDate}`, requestOptions).then((response) =>{
                response.json().then((data) => {
                    if(response.status !== 200){
                        alert(data.error);
                        return;
                    }
                    console.log(data.message); // first fetch is entire revenue

                    const fixDate = data.message.map((app) => ({
                        ...app,
                        date_charged: app.date_charged.split('T')[0],
                      }));
                    setInvoices(fixDate);

                    setTable(true);
                
                });
            });
            // second statement is the invoices
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
            <div className="container-fluid">
                <h4>{`Total Account Created: ${totalAccount[0].total_accounts}`}</h4>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Date Created</th>
                            <th>Created Appointment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAccounts.map((user, index) => (
                            <tr key={index}>
                                <td>{`${user.first_name}`}</td>
                                <td>{`${user.last_name}`}</td>
                                <td>{`${user.email_address}`}</td>
                                <td>{`${user.created}`}</td>
                                <td>{`${user.appointment_created}`}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                </div>
            </>
        );
    }

    function reportTwo(){
        return(
            <>
             <h4>{`Total Appointments Schedules: ${totalAppointments[0].total_appointments}`}</h4>
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
                                <td>{`${user.doctor_id}`}</td>
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


    function reportThree(){
        return(
            <>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>Appointment Revenue</th>
                            <th>Late Fees Revenue</th>
                            <th> Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    <tr key={0}>
                                <td>{`$ ${revenue[2].total_amount}.00`}</td>
                                <td>{`$ ${revenue[1].total_amount}.00`}</td>
                                <td>{`$ ${revenue[0].total_amount}.00`}</td>
                            </tr>
                            
                    </tbody>
                </table>
                        
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>Date Charged</th>
                            <th>Invoice ID</th>
                            <th>Patient ID</th>
                            <th>Patient Last Name</th>
                            <th>Type of Charge</th>
                            <th>Amount Charged</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, index) => (
                            <tr key={index}>
                                <td>{`${invoice.date_charged}`}</td>
                                <td>{`${invoice.invoice_num}`}</td>
                                <td>{`${invoice.patient_id}`}</td>
                                <td>{`${invoice.last_name}`}</td>
                                <td>{`${invoice.charge_type}`}</td>
                                <td>{`$ ${invoice.amount}.00`}</td>
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
                        <option value="3">Clinic Revenue</option>
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
                { formData.reportId === '3' && showTable && reportThree()}
           </form>
        
    </>
    );
}

export default AdminReports; 
