import React from "react";
import Navbar from "../../components/Navbar";
import DisplayClinicAppointment from "../../components/DisplayClinicAppointment"
function ViewDoctorAppointments(){
    return(
    <>
        <Navbar />
        
        <DisplayClinicAppointment />
    </>
    );
}

export default ViewDoctorAppointments;