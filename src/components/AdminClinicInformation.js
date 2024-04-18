import React, { useEffect, useRef, useState } from "react";

function AdminClinicInformation(){
    const [clinicInfo, setClinicInfo] = useState([{"clinic_name": ""}])
    const admin_id = localStorage.getItem("UserEmail");

    const getClinicInfo= () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/getClinicInfo/${admin_id}`, requestOptions).then((response) =>{
            response.json().then((data) => {
                if(response.status !== 200){
                    alert(data.error);
                    return;
                }
                console.log(data.message);
                setClinicInfo(data.message);
                
                //setTable(true);
            });
        });
    }
    
    const fetchClinicInfoRef = useRef(getClinicInfo);

    useEffect(() => {
        fetchClinicInfoRef.current();
    }, [fetchClinicInfoRef]);

    return(
   
        <form className="form-control m-4 w-auto">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="https://wallpapercave.com/wp/wp13114032.jpg" class="img-fluid rounded-start" alt="hospital building" />
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title m-0"><bold>{`${clinicInfo[0].clinic_name}`}</bold></h3>
                                <h5 className="card-title m-0"><bold>Business Hours:</bold></h5>
                                <p className="card-text"><small class="text-body-secondary">Sunday: 9:00 AM to 5:00 PM</small></p>
                                <p className="card-text"><small class="text-body-secondary">Monday: 9:00 AM to 5:00 PM</small></p>
                                <p className="card-text"><small class="text-body-secondary">Tuesday: 9:00 AM to 5:00 PM</small></p>
                                <p className="card-text"><small class="text-body-secondary">Wednesday: 9:00 AM to 5:00 PM</small></p>
                                <p className="card-text"><small class="text-body-secondary">Thursday: 9:00 AM to 5:00 PM</small></p>
                                <p className="card-text"><small class="text-body-secondary">Friday: 9:00 AM to 5:00 PM</small></p>
                                <p className="card-text"><small class="text-body-secondary">Saturday: 9:00 AM to 5:00 PM</small></p>
                            </div>
                            </div>
                        </div>
                        </div>
            </form>
        
            


    );
}

export default AdminClinicInformation;