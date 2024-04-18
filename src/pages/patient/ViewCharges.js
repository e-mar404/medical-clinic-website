import { useEffect } from 'react';
import Navbar from '../../components/Navbar';

var FetchedCharges = false; // Condition to ensure the fetch is ran only once

function ViewCharges() {
  useEffect(() => {
    const getMethod = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const fetchCharges = async () => {
      const patient_id = localStorage.getItem("UserId");
      if (!FetchedCharges) {
        FetchedCharges = true;
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/patient/view_charges/${patient_id}`, getMethod).then((response) => {
            response.json().then((data) => {
                if (response.status !== 200) {
                    alert(data.error);
                    return;
                }
                let Appointments = document.querySelector("#Charges");
                data.message.forEach((Charge) => {
                    console.log(Charge);
                
                    let newRow = document.createElement("tr");
                    newRow.innerHTML = `
                      <td>${Charge.invoice_num}</td>
                      <td>${Charge.date_charged.slice(0, 10)}</td>
                      <td>${Charge.charge_type}</td>
                      <td>${Charge.clinic_name}</td>
                      <td>$${Charge.amount}</td>
                      <td>${Charge.paid === 0 ? '❌' : '✅'}</td>
                    `;
                    Appointments.appendChild(newRow);
                });
            });
        });
    }

    }

    fetchCharges();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
          <div className="h1 mx-auto text-center pt-5">Viewing Charges</div>
          <div className="h5 mx-auto text-center"><em>Please contact a receptionist to pay fees</em></div>
          </div>
        </div>
        <div className="row">
          <div className="col p-5">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Invoice Number</th>
                  <th scope="col">Date Charged</th>
                  <th scope="col">Charge Type</th>
                  <th scope="col">Clinic Name</th>
                  <th scope="col">Amount Due</th>
                  <th scope="col">Paid</th>
                </tr>
              </thead>
              <tbody id="Charges">

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  );
}

export default ViewCharges;

