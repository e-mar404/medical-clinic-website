import React, { useEffect, useRef } from "react";

function AdminClinicInformation(){

    const getClinicInfo= () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/getClinicInfo/1`, requestOptions).then((response) =>{
            response.json().then((data) => {
                if(response.status !== 200){
                    alert(data.error);
                    return;
                }
                console.log(data.message);
                //setAppointments(data.message);
                
                //setTable(true);
            });
        });
    }
    
    const fetchClinicInfoRef = useRef(getClinicInfo);

    useEffect(() => {
        fetchClinicInfoRef.current();
    }, [fetchClinicInfoRef]);

    return(

            <div>
                
            </div>


    );
}

export default AdminClinicInformation;