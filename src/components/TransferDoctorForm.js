import React from "react";

function TransferDoctorForm(){
    return(
        <>
        <div className="login-page">
          <div className="form">
            <form className="login-form">
            <label>Transfer Employee</label>
                <div className="currentDoctor">
                    <p>Doctor First Name Doctor Last Name</p>
                    <p>Current Clinic</p>
                </div>
                <select class="form-select">
                    <option selected disabled>Current Clinic</option>
                    <option value="1">Clinic 1</option>
                    <option value="2">Clinic 2</option>
                    <option value="3">Clinic 3</option>
                </select>
                
              <button>Confirm</button>
           </form>
          </div>
        </div>
      </>
    );
}

export default TransferDoctorForm;