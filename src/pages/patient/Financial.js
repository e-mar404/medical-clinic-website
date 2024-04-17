import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

var FetchedCards = false; // Condition to ensure the fetch is ran only once

function PatientFinancial() {
    useEffect(() => {
        const getMethod = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        const fetchFinancial = async () => {
            const patient_id = localStorage.getItem("UserId");

            if (!FetchedCards) {
                FetchedCards = true;
                fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/financial/${patient_id}`, getMethod).then((response) => {
                    response.json().then((data) => {
                        if (response.status !== 200) {
                            alert(data.error);
                            return;
                        }

                        console.log(data.message);
                    });
                });
            }
        }

        fetchFinancial();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container-md mx-auto">
                <div className="row mt-3">
                    <div className="col-12">
                        <ul className="nav nav-tabs" id="NavHeader">
                            <li className="nav-item">
                                <a className="nav-link" id="Profile" href="/patient/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" id="Financial" href="/patient/financial">Financial</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="Emergency" href="/patient/emergency_contacts">Emergency</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="Insurance" href="/patient/insurance">Insurance</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <form id="FinancialForm">

                </form>

                <div className="row mt-3">
                    <div className="col-12">
                        <button type="button" className="btn btn-primary btn float-end mt-3" id="AddButton">Add Card</button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default PatientFinancial;
