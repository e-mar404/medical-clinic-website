import { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar';

var FetchedContacts = false; // Condition to ensure the fetch is ran only once

function PatientEmergency() {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactRelationship, setContactRelationship] = useState('');

  const handleContactNameChange = (e) => {
    setContactName(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleContactRelationshipChange = (e) => {
    setContactRelationship(e.target.value);
  };

  const postFunction = (e) => {
      let vContactNumber = contactNumber;
      let action = "insert";
      if (e !== "AddButton") {
          action = "delete";
          vContactNumber = e.target.id;
      }

      if (action === "insert") {
          if (document.querySelector("#ContactName").value.trim() === "" || document.querySelector("#ContactNumber").value.trim() === "" || document.querySelector("#ContactRelationship").value.trim() === "") {
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
              'contact_name': contactName,
              'contact_number': vContactNumber,
              'contact_relationship': contactRelationship,
              'action': action
          })
      };

      fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/emergency`, postMethod).then((response) => {
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

  const postFunctionRef = useRef(postFunction);
  
  useEffect(() => {
      const getMethod = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      };

      const fetchFinancial = async () => {
          const patient_id = localStorage.getItem("UserId");

          if (!FetchedContacts) {
            FetchedContacts = true;
              fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/emergency/${patient_id}`, getMethod).then((response) => {
                  response.json().then((data) => {
                      if (response.status !== 200) {
                          alert(data.error);
                          return;
                      }
                      let cardHolder = document.querySelector("#cardHolder");

                      data.message.forEach(card => {
                          console.log(card);
                          let newCard = document.createElement('div');
                          newCard.id = `${card.card_number}`;
                          newCard.classList.add('row', 'mt-3');
                          newCard.innerHTML =
                          `
                          <div class="col-5">
                              <div class="mr-3 ml-3">
                                  <label>Name</label>
                                  <input
                                      type="text"
                                      class="form-control mt-1"
                                      id="ContactName"
                                      value='${card.contact_name}'
                                      readonly
                                  />
                              </div>
                          </div>
                          <div class="col-3">
                              <div class="mr-3 ml-3">
                                  <label>Phone Number</label>
                                  <input
                                      type="text"
                                      class="form-control mt-1"
                                      id="ContactNumber"
                                      value='${card.contact_number}'
                                      readonly
                                      />
                              </div>
                          </div>
                          <div class="col-3">
                              <div class="mr-3 ml-3">
                                  <label>Relationship</label>
                                  <input
                                      type="text"
                                      class="form-control mt-1"
                                      id="ContactRelationship"
                                      value='${card.contact_relationship}'
                                      readonly
                                  />
                              </div>
                          </div>
                          <div class="col-1">
                            <button type="button" style="margin-top: 32px;" class="RemoveButton" id="${card.contact_number}">❌</button>
                          </div>
                </div>

                          `;

                          cardHolder.appendChild(newCard);
                          console.log(data.message);
                      })
                      document.querySelectorAll(".RemoveButton").forEach(button => {
                          button.addEventListener("click", postFunctionRef.current);
                      });                        
                  });
              });
          }
      }

      fetchFinancial();
  }, [postFunctionRef]);

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
                              <a className="nav-link" id="Financial" href="/patient/financial">Financial</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link active" id="Emergency" href="/patient/emergency_contacts">Emergency</a>
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
                              <div className="col-5">
                                  <div className="mr-3 ml-3">
                                      <label>Name</label>
                                      <input
                                          type="text"
                                          className="form-control mt-1"
                                          id="ContactName"
                                          value={contactName}
                                          onChange={handleContactNameChange}
                                      />
                                  </div>
                              </div>
                              <div className="col-3">
                                  <div className="mr-3 ml-3">
                                      <label>Phone Number</label>
                                      <input
                                          type="text"
                                          className="form-control mt-1"
                                          id="ContactNumber"
                                          value={contactNumber}
                                          onChange={handleContactNumberChange}
                                      />
                                  </div>
                              </div>
                              <div className="col-3">
                                  <div className="mr-3 ml-3">
                                      <label>Relationship</label>
                                      <input
                                          type="text"
                                          className="form-control mt-1"
                                          id="ContactRelationship"
                                          value={contactRelationship}
                                          onChange={handleContactRelationshipChange}
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
                      <span className="h4 m-0">Saved Emergency Contacts</span>
                  </div>


              </div>

          </div>


      </>
  );
}

export default PatientEmergency;
