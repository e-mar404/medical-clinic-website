import React from "react";

function AdminReports(){

    return(
      
        <div className="login-page">
          <div className="form">
            <form className="login-form">
            <label>Generate Report</label>
                <div className="report">
                    <p>Report Type</p>
                </div>
                <select className="form-select">
                    <option selected disabled>Select Report Type</option>
                    <option value="1">Employees By Clinic</option>
                    <option value="2">Clinic 2</option>
                    <option value="3">Clinic 3</option>
                </select>
                
              <button>Generate</button>
           </form>
          </div>
        </div>
    
    );
}

export default AdminReports; 