import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

const ReceptionistBilling = () => {
    const [charges, setCharges] = useState([]);
    // if not being used pls remove 
    // const [paymentAmount, setPaymentAmount] = useState('');

    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                    }
                };
                const url = `${process.env.REACT_APP_BACKEND_HOST}/patientBilling`;
                
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                
                // Process the billing data here
                const formattedData = data.map(charge => ({
                    ...charge,
                    date_charged: new Date(charge.date_charged).toLocaleDateString()
                }));

                setCharges(formattedData);
            } catch (error) {
                console.error("Error fetching billing data:", error);
            }
        };
        fetchBillingData()        
    }, []);

    const handlePayment = (index) => {
        const amount = parseFloat(prompt('Enter payment amount:'));
        if (!isNaN(amount) && amount >= 0) {
            const updatedCharges = [...charges];
            const remainingAmount = updatedCharges[index].amount - updatedCharges[index].paid;
            if (amount <= remainingAmount) {
                updatedCharges[index].paid += amount;
                setCharges(updatedCharges);
            } else {
                alert(`You can only pay up to ${remainingAmount}.`);
            }
        } else {
            alert('Invalid payment amount!');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Navbar />
            <h2>Charges</h2>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black' }}>Invoice Number</th>
                        <th style={{ border: '1px solid black' }}>Patient ID</th>
                        <th style={{ border: '1px solid black' }}>Amount</th>
                        <th style={{ border: '1px solid black' }}>Date Charged</th>
                        <th style={{ border: '1px solid black' }}>Paid</th>
                        <th style={{ border: '1px solid black' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {charges.map((charge, index) => (
                        <tr key={charge.invoice_num}>
                            <td style={{ border: '1px solid black' }}>{charge.invoice_num}</td>
                            <td style={{ border: '1px solid black' }}>{charge.patient_id}</td>
                            <td style={{ border: '1px solid black' }}>{charge.amount}</td>
                            <td style={{ border: '1px solid black' }}>{charge.date_charged}</td>
                            <td style={{ border: '1px solid black' }}>{charge.paid}</td>
                            <td style={{ border: '1px solid black' }}>
                                <button onClick={() => handlePayment(index)}>Pay</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReceptionistBilling;
