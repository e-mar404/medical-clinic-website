import React, { useState } from "react";
import DatePicker from 'react-datepicker';

function AdminReports(){

    // make form 
    // after update change form values
    // on click send form to other page using useNavigate and use Location
    
    const fetchReport = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
    };
    
   //fetch(`${process.env.REACT_APP_BACKEND_HOST}/get`)

    const [formData, setFormData] = useState({
        reportId:-1,
        startDate: null,
        endDate: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value,
        })
    };

    return(
      
        <div className="login-page">
          <div className="form">
            <form className="login-form">
            <label>Generate Report</label>
                <div className="report">
                    <p>Report Type</p>
                </div>
                <select className="form-select"
                    name="reportId"
                    value = {formData.reportId}
                    onChange={handleInputChange}
                    required
                >
                    <option selected disabled>Select Report Type</option>
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
                    //on change change start date 
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
                    //on change change start date 
                    // need to display date on the screen
                />

        
              <button className="submit-button" type="submit" href="/admin/report">Generate</button>
           </form>
          </div>
        </div>
    
    );
}

export default AdminReports; 