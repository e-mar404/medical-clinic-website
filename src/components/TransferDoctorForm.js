import React from 'react'; //, { useState, useRef, useEffect } from 'react';
//import { useParams } from 'react-router-dom';

function TransferDoctorForm(){
    // okay get doctor id from params
    // use it get doctor info
    // now use doctor.primary_clinic to get all other clinics that are NOT primary_clinic
    /*
    const { doctor_id } = useParams(); // part 1
    const [doctor, setDoctor] = useState([{"first_name": "test", "last_name": "test", "email_address": "test@email.com", "title":"doctor", "primary_clinic":-1}]);
    //const doctorRef = useRef(doctor);
    const [clinics, setClinics] = useState([{'clinic_name':'name'}]);
    //const [doctorRef, setDoctorRef] = useRef(doctor);
    // get current clinic info 
    const fetchDoctorInfo = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        console.log(`employee id is ${doctor_id}`);

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/get_doctor/${doctor_id}`, requestOptions).then((response) => {
        response.json().then((data) => {
        if (response.status !== 200) {
          alert(data.error);
          return;
        }
        //let doctorInf = data.message;
        let docInfo = data.message;
        console.log(`doc info from d.m ${docInfo[0].email_address}`);
        setDoctor(docInfo);
        console.log(`just docInf ${docInfo[0].email_address}`);
        console.log(`just doc ${doctor[0].email_address}`);
        



      });
    });
    }

    const fetchClinics = () => { // get the clinics 
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/getClinics`, requestOptions).then((response) => {
            response.json().then((data) => {
            if (response.status !== 200) {
              alert(data.error);
              return;
            }
            //let doctorInf = data.message;
            console.log()
          });
        });
        
    }
    const fetchDocRef = useRef(fetchDoctorInfo);
    useEffect(() => {
        fetchDocRef.current();
        console.log(`use effect ${doctor[0].email_address}`);
        //console.log(doctor[0].email_address)
    }, [fetchDocRef]);
    
    function handleClinicChange(e){
        setClinics(e.target.value); // ok sets the clinic id  
        fetchDoctorInfo();
    }
    */
    // need clinic to transfer to
    function TransferEmployee(e){
        console.log("transfer employee click placeholder" );
        //fetchDoctorInfo();
        /*
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    'email_address': email,
                    'primary_clinic': clinic_id
                }
            )
        };
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/admin/transfer`, requestOptions).then((response) => {
            response.json().then((data) => {
                console.log(data);
            })
        })
        */
        
    };
    
    function handleClinicChange(e){
        console.log("handle click placeholder")
        //setClinics(e.target.value); // ok sets the clinic id  
        //fetchDoctorInfo();
    }
    
    return(
      
        <div className="login-page">
          <div className="form">
            <form className="login-form">
            <label>Transfer Employee</label>
                <div className="currentDoctor">
                    <p>Doctor First Name Last Name</p>
                </div>
                <select className="form-select">
                    <option selected disabled onChange={handleClinicChange}>Change Clinic</option>
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
