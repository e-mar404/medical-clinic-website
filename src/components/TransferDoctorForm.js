import React, { useState } from 'react';

function TransferDoctorForm(){
    const [clinic_id, setClinic] = useState('');
    const [email, setEmail] = useState({
        email:"employee11@email.com"
    });
    //const email = localStorage.getItem('UserEmail'); // should save the user email to send to post request
    console.log(setEmail);
    function TransferEmployee(e){
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'email': email,
                    'clinic_id': clinic_id
                }
            )
        };
        fetch('/admin/transfer', requestOptions).then((response) => {
            response.json().then((data) => {
                console.log(data);
            })
        })
    };
    return(
      
        <div className="login-page">
          <div className="form">
            <form className="login-form">
            <label>Transfer Employee</label>
                <div className="currentDoctor">
                    <p>Doctor First Name Doctor Last Name</p>
                    <p>Current Clinic</p>
                </div>
                <select className="form-select">
                    <option selected disabled onChange={(e) => setClinic(e.target.value)}>Change Clinic</option>
                    <option value="1">Clinic 1</option>
                    <option value="2">Clinic 2</option>
                    <option value="3">Clinic 3</option>
                </select>
                
              <button onClick={(e)=>TransferEmployee(e)}>Confirm</button>
           </form>
          </div>
        </div>
    
    );
}

export default TransferDoctorForm;