import { useEffect } from 'react';
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
                        let cardHolder = document.querySelector("#cardHolder");

                        data.message.forEach(card => {
                            let newCard = document.createElement('div');
                            newCard.id = `${card.card_number}`;
                            newCard.classList.add('row', 'mt-3');
                            newCard.innerHTML =
                            `
                            <div class="col-4">
                                <div class="mr-3 ml-3">
                                    <label>Card Number</label>
                                    <input type="text" class="form-control mt-1" id="CardNumber" value='${card.card_number}' readOnly />
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="mr-3 ml-3">
                                    <label>Name on Card</label>
                                    <input type="text" class="form-control mt-1" id="NameOnCard" value='${card.name_on_card}' readOnly />
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="mr-3 ml-3">
                                    <label>Expiration Date (mm/yy)</label>
                                    <input type="text" class="form-control mt-1" id="ExpirationDate" value='${card.expiration_date}' readOnly />
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="mr-3 ml-3">
                                    <label>CVV</label>
                                    <input type="text" class="form-control mt-1" id="CVV" value='${card.cvv}' readOnly />
                                </div>
                            </div>
                            <div class="col-1">
                                <button type="button" class="float-end" id="RemoveButton">❌</button>
                            </div>
                            `;

                            cardHolder.appendChild(newCard);
                            console.log(data.message);
                        })
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

                <div id="FinancialCards">

                    <div className="row mt-3" id="cardHolder">
                        <span className="h4 m-0">Patient Financial</span>

                        <div className="row mt-3">
                            <div className="col-4">
                                <div className="mr-3 ml-3">
                                    <label>Card Number</label>
                                    <input type="text" className="form-control mt-1" id="CardNumber" value={``} readOnly />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="mr-3 ml-3">
                                    <label>Name on Card</label>
                                    <input type="text" className="form-control mt-1" id="NameOnCard" value={``} readOnly />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="mr-3 ml-3">
                                    <label>Expiration Date (mm/yy)</label>
                                    <input type="text" className="form-control mt-1" id="ExpirationDate" value={``} readOnly />
                                </div>
                            </div>
                            <div className="col-1">
                                <div className="mr-3 ml-3">
                                    <label>CVV</label>
                                    <input type="text" className="form-control mt-1" id="CVV" value={``} readOnly />
                                </div>
                            </div>
                            <div className="col-1">
                                <button type="button" className="float-end" id="RemoveButton">❌</button>
                            </div>
                        </div>

                    </div>


                </div>


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
