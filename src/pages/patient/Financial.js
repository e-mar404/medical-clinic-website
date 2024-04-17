import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

var FetchedCards = false; // Condition to ensure the fetch is ran only once

function PatientFinancial() {
    const [cardNumber, setCardNumber] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCVV] = useState('');

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleNameOnCardChange = (e) => {
        setNameOnCard(e.target.value);
    };

    const handleExpirationDateChange = (e) => {
        setExpirationDate(e.target.value);
    };

    const handleCVVChange = (e) => {
        setCVV(e.target.value);
    };

    const postFunction = (e) => {
        let vCardNumber = cardNumber;
        let action = "insert";
        if (e !== "AddButton") {
            action = "delete";
            vCardNumber = e.target.id;
        }

        if (action === "insert") {
            if (document.querySelector("#CardNumber").value.trim() === "" || document.querySelector("#NameOnCard").value.trim() === "" || document.querySelector("#ExpirationDate").value.trim() === "" || document.querySelector("#CVV").value.trim() === "") {
                alert('Please fill out all required fields!');
                return;
            }

        }

        const postMethod = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify({
                'patient_id': localStorage.getItem("UserId"),
                'card_number': vCardNumber,
                'name_on_card': nameOnCard,
                'expiration_date': expirationDate,
                'cvv': cvv,
                'action': action
            })
        };

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/financial`, postMethod).then((response) => {
            response.json().then((data) => {
                if (response.status === 200) {
                    if (action === "insert") {
                        alert("Successfully added card!");
                    }
                    else {
                        alert("Successfully deleted card!");
                    }
                    window.location.reload();
                }
                else {
                    alert("something broke");
                }
            });
        });
    }

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
                                    <input type="text" class="form-control mt-1" value='${card.card_number}' readOnly />
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="mr-3 ml-3">
                                    <label>Name on Card</label>
                                    <input type="text" class="form-control mt-1" value='${card.name_on_card}' readOnly />
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="mr-3 ml-3">
                                    <label>Expiration Date (mm/yy)</label>
                                    <input type="text" class="form-control mt-1" value='${card.expiration_date}' readOnly />
                                </div>
                            </div>
                            <div class="col-1">
                                <div class="mr-3 ml-3">
                                    <label>CVV</label>
                                    <input type="text" class="form-control mt-1" value='${card.cvv}' readOnly />
                                </div>
                            </div>
                            <div class="col-1">
                                <button type="button" style="margin-top: 32px;" class="RemoveButton" id="${newCard.id}">❌</button>
                            </div>
                            `;

                            cardHolder.appendChild(newCard);
                            console.log(data.message);
                        })
                        document.querySelectorAll(".RemoveButton").forEach(button => {
                            button.addEventListener("click", postFunction);
                        });                        
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
                        <form>
                            <div className="row mt-3">
                                <div className="col-4">
                                    <div className="mr-3 ml-3">
                                        <label>Card Number</label>
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            id="CardNumber"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mr-3 ml-3">
                                        <label>Name on Card</label>
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            id="NameOnCard"
                                            value={nameOnCard}
                                            onChange={handleNameOnCardChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mr-3 ml-3">
                                        <label>Expiration Date (mm/yy)</label>
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            id="ExpirationDate"
                                            value={expirationDate}
                                            onChange={handleExpirationDateChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-1">
                                    <div className="mr-3 ml-3">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            className="form-control mt-1"
                                            id="CVV"
                                            value={cvv}
                                            onChange={handleCVVChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-1">
                                    <button
                                        type="button"
                                        style={{ marginTop: '28px' }}
                                        className="btn btn-primary btn float-end"
                                        id="AddButton"
                                        onClick={(event) => postFunction(event.target.id)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="row mt-4">
                            <hr />
                        </div>
                        <span className="h4 m-0">Saved Cards</span>
                    </div>


                </div>

            </div>


        </>
    );
}

export default PatientFinancial;
