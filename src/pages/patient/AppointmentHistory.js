import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

var FetchedAppointmentHistory = false; // Condition to ensure the fetch is ran only once

function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const time12 = `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    return time12;
}
function AppointmentHistory() {
    useEffect(() => {
        const getMethod = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        const fetchHistory = async () => {
            const patient_id = localStorage.getItem("UserId");

            if (!FetchedAppointmentHistory) {
                FetchedAppointmentHistory = true;
                fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/appointment_history/${patient_id}`, getMethod).then((response) => {
                    response.json().then((data) => {
                        if (response.status !== 200) {
                            alert(data.error);
                            return;
                        }
                        let Appointments = document.querySelector("#Appointments");
                        data.message.forEach((Appointment) => {
                            console.log(Appointment);
                            let convertedConfirmation = 'No';
                            if (Appointment.confirmation === 1)
                                convertedConfirmation = 'Yes';
                        
                            let newRow = document.createElement("tr");
                            newRow.innerHTML = `
                                <th scope="row">${Appointment.appointment_id}</th>
                                <td>${Appointment.appointment_date.slice(0, 10)}</td>
                                <td>${Appointment.appointment_status}</td>
                                <td>${Appointment.clinic_name}</td>
                                <td>${Appointment.first_name + " " + Appointment.last_name}</td>
                                <td>${convertTo12Hour(Appointment.appointment_time)}</td>
                                <td>${convertedConfirmation}</td>
                            `;
                            Appointments.appendChild(newRow);
                        });
                    });
                });
            }
        }

        fetchHistory();
    }, []);
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="h1 mx-auto text-center pt-5">Appointment History</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col p-5">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Clinic</th>
                                    <th scope="col">Doctor</th>
                                    <th scope="col">Appointment Time</th>
                                    <th scope="col">Confirmation</th>
                                </tr>
                            </thead>
                            <tbody id="Appointments">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default AppointmentHistory;

