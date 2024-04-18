import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TransferDoctorForm(){
    const { doctor_id } = useParams(); 
    const [doctor, setDoctor] = useState([{"first_name": "test", "last_name": "test", "email_address": "test@email.com", "title":"doctor", "primary_clinic":0}]);
    const [clinics, setClinics] = useState([{"clinic_id":0,'clinic_name':'name'}]);
    const [allDoctors, setAllDoctors] = useState([{"employee_id":0, "first_name": "test", "last_name": "test"}]);


    const [clinicForAdmin, setClinicForAdmin] = useState(-1);
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
        setDoctor(data.message);
        setClinicForAdmin(data.message[0].primary_clinic);
        let clinicID = data.message[0].primary_clinic;
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/getClinicDoctor/${clinicID}/${doctor_id}`, requestOptions).then((response) => {
            response.json().then((data) => {
            if (response.status !== 200) {
              alert(data.error);
              return;
            }
            setAllDoctors(data.message);

          });
        });
      });
    });
    }

    const fetchClinics = () => { // get the clinics 

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/get_clinics`, requestOptions).then((response) => {
            response.json().then((data) => {
            if (response.status !== 200) {
              alert(data.error);
              return;
            }
            //let doctorInf = data.message;
            setClinics(data.message);

            console.log(`in ${data.message[0].clinic_id}`);
          });
        });
        
    }
    const fetchDocRef = useRef(fetchDoctorInfo);
    const fetchClinicRef = useRef(fetchClinics);

    useEffect(() => {
        fetchDocRef.current();
        fetchClinicRef.current();
    }, [fetchDocRef, fetchClinicRef]);
    

    // need clinic to transfer to
    const [formData, setFormData] = useState ({
        newClinicId: -1,
        newDoctorId: -1,
        date: new Date()
    });
    const formatDate = (date) => {
        return `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
            setFormData({
                ...formData,
                [name]: value,
            })
    };
    const nav = useNavigate();
    function transferEmployee(e){
        e.preventDefault();

        const requestOptions = { // first patients
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'new_doctor': formData.newDoctorId,
                'old_doctor': doctor_id
            })
        };
        console.log(`new ${requestOptions.body} old ${doctor_id}`)
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/update_all_patients`, requestOptions).then((response) => {
            response.json().then((data) => {

                if(response.status !== 200){
                    alert(data.error);
                    return;
                }

                const request = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                        'clinic_id': formData.newClinicId,
                        'employee_id': doctor_id
         
                })
               };
               console.log(`new c ${formData.newClinicId} `)
               console.log(`old C ${doctor_id}`)
               fetch(`${process.env.REACT_APP_BACKEND_HOST}/admin/transfer`, request).then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    if(response.status !== 200){
                        alert(data.error);
                        return;
                    }
                    //alert(data.message);
                });
                });

                const requestOp = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "appointment_date": formatDate(formData.date),
                        "doctor_id": doctor_id
                    })
                }
                fetch(`${process.env.REACT_APP_BACKEND_HOST}/cancel_appointments_transfer`, requestOp).then((response) => {
                    response.json().then((data) => {
                        console.log(data);
                        if(response.status !== 200){
                            alert(data.error);
                            return;
                        }
                        //alert(data.message);
                        nav('/admin/employeeList', {});
                    });
                    });

            });
        });
       
    };
    
    
    return(
      
            <div className='login-page'>
            <form className="form" onSubmit={transferEmployee}>
            <label>Transfer Employee</label>
                <div className="currentDoctor">
                    <p>{`${doctor[0].first_name} ${doctor[0].last_name}`}</p>
                </div>
                <select className="form-select" name="newClinicId" onChange={handleInputChange}>
                    <option disabled selected key={-1}>Choose Clinic</option> 
                
                    {clinics.map(clinic => (
                        clinic.clinic_id !== clinicForAdmin  && (
                        <option key={clinic.clinic_id} value={clinic.clinic_id}>{clinic.clinic_name}</option> )
                        
                        ))}
                </select>

                <select className="form-select" name="newDoctorId" onChange={handleInputChange}>
                    <option disabled selected key={-1}>Choose Doctor To Transfer Patients: </option> 
                    {allDoctors.map((doc) => (
                    
                        <option key= {doc.employee_id}value={doc.employee_id}>{`Dr. ${doc.first_name} ${doc.last_name}`}</option> 
                    ))}
                </select>
                
              <button className="submit-button" type="submit">Confirm</button>
           </form>
        </div>
    );
}

export default TransferDoctorForm;
