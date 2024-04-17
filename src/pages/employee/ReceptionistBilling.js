import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

const ReceptionistBilling = () => {

    const [charges, setCharges] = useState([]);

    const [filteredCharges, setFilteredCharges] = useState([]);
    const [searchFirstName, setSearchFirstName] = useState('');
    const [searchLastName, setSearchLastName] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [invoiceNumberFilter, setInvoiceNumberFilter] = useState('');

    useEffect(() => {
        // Filter the charges based on the search criteria, selected amount, date, and invoice number
        const filteredData = charges.filter(charge => {
            const firstNameMatch = charge.patientFirstName.toLowerCase().includes(searchFirstName.toLowerCase());
            const lastNameMatch = charge.patientLastName.toLowerCase().includes(searchLastName.toLowerCase());
            const amountMatch = selectedAmount === '' || charge.amount.toString() === selectedAmount;

            const dateParts = charge.date_charged.split('/');
            const month = parseInt(dateParts[0]);
            const day = parseInt(dateParts[1]);
            const year = parseInt(dateParts[2]);

            const selectedMonth = selectedDate ? parseInt(selectedDate.split('/')[0]) : null;
            const selectedDay = selectedDate ? parseInt(selectedDate.split('/')[1]) : null;
            const selectedYear = selectedDate ? parseInt(selectedDate.split('/')[2]) : null;

            const monthMatch = selectedDate === '' || month === selectedMonth || !selectedMonth;
            const dayMatch = selectedDate === '' || day === selectedDay || !selectedDay;
            const yearMatch = selectedDate === '' || year === selectedYear || !selectedYear;

            const invoiceNumberMatch = invoiceNumberFilter === '' || charge.invoice_num.toString() === invoiceNumberFilter;

            return firstNameMatch && lastNameMatch && amountMatch && monthMatch && dayMatch && yearMatch && invoiceNumberMatch;
        });

        console.log('filtered data:', filteredData);
        setFilteredCharges(filteredData);
    }, [charges, searchFirstName, searchLastName, selectedAmount, selectedDate, invoiceNumberFilter]);

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
                setFilteredCharges(formattedData);
            } catch (error) {
                console.error("Error fetching billing data:", error);
            }
        };
        fetchBillingData()        
    }, []);

    const handlePayment = async (index) => {
        const amount = parseFloat(prompt('Enter payment amount:'));
        if (!isNaN(amount) && amount >= 0) {
            const updatedCharges = [...charges];
            const remainingAmount = updatedCharges[index].amount - updatedCharges[index].paid;
            if (amount <= remainingAmount) {
                // Update the paid amount in the updatedCharges array
                updatedCharges[index].paid += amount;
                setCharges(updatedCharges); // Update state with the new data
        
                // Prepare the payment information
                const invoiceNumber = updatedCharges[index].invoice_num;
                const paidAmount = updatedCharges[index].paid; // Update with the new paid amount
        
                // Send POST request to ReceptionistPayBill endpoint
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'invoiceNumber': invoiceNumber,
                        'paidAmount': paidAmount
                    })
                };
                const url = `${process.env.REACT_APP_BACKEND_HOST}/ReceptionistPayBill`;
                try {
                    const response = await fetch(url, requestOptions);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    // Handle the response if needed
                    const data = await response.json();
                    console.log("Payment successfully processed:", data);
                } catch (error) {
                    console.error("Error processing payment:", error);
                }
            } else {
                alert(`You can only pay up to ${remainingAmount}.`);
            }
        } else {
            alert('Invalid payment amount!');
        }
    }

    const handleFilterChange = (event) => {
        setSelectedAmount(event.target.value);
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleInvoiceNumberChange = (event) => {
        setInvoiceNumberFilter(event.target.value);
    };
    
    return (
        <div style={{ textAlign: 'center' }}>
            <Navbar />
         
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <input
                type="text"
                placeholder="Search by First Name"
                value={searchFirstName}
                onChange={(e) => setSearchFirstName(e.target.value)}
                style={{ marginRight: '10px' }} // Add margin between input and select
            />
            <input
                type="text"
                placeholder="Search by Last Name"
                value={searchLastName}
                onChange={(e) => setSearchLastName(e.target.value)}
                style={{ marginRight: '10px' }} // Add margin between input and select
            />
            <select
                value={selectedAmount}
                onChange={handleFilterChange}
                style={{ marginRight: '10px' }} // Add margin between select and input
            >
                <option value="">Select Amount</option>
                <option value="15">No-Show Charge</option>
                <option value="100">Appointment Charge</option>
            </select>
            <input
                type="text"
                placeholder="Date (MM/DD/YYYY)"
                value={selectedDate}
                onChange={handleDateChange}
                style={{ marginRight: '10px' }} // Add margin between input and select
            />
            <input
                type="text"
                placeholder="Invoice Number"
                value={invoiceNumberFilter}
                onChange={handleInvoiceNumberChange}
                style={{ marginRight: '10px' }} // Add margin between input and select
            />
            </div>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black' }}>Invoice Number</th>
                        <th style={{ border: '1px solid black' }}>First Name</th> {/* New column for patient first name */}
                        <th style={{ border: '1px solid black' }}>Last Name</th> {/* New column for patient last name */}
                        <th style={{ border: '1px solid black' }}>Amount</th>
                        <th style={{ border: '1px solid black' }}>Date Charged</th>
                        <th style={{ border: '1px solid black' }}>Paid</th>
                        <th style={{ border: '1px solid black' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCharges.map((charge, index) => (
                        <tr key={charge.invoice_num}>
                            <td style={{ border: '1px solid black' }}>{charge.invoice_num}</td>
                            <td style={{ border: '1px solid black' }}>{charge.patientFirstName}</td> {/* Display patient first name */}
                            <td style={{ border: '1px solid black' }}>{charge.patientLastName}</td> {/* Display patient last name */}
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