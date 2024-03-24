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
                    <option value="1">Report Types Go Here</option>
                </select>
                
              <button className="submit-button" type="submit">Generate</button>
           </form>
          </div>
        </div>
    
    );
}

export default AdminReports; 