import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import BillingPDF from '../../components/BillingPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import '../../components/ReceptionistBilling.css'

const ReceptionistBilling = () => {

    const [charges, setCharges] = useState([]);

    const [filteredCharges, setFilteredCharges] = useState([]);
    const [searchFirstName, setSearchFirstName] = useState('');
    const [searchLastName, setSearchLastName] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [invoiceNumberFilter, setInvoiceNumberFilter] = useState('');
    const [lastSuccessfulPayment, setLastSuccessfulPayment] = useState(null);


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
                    setLastSuccessfulPayment(updatedCharges[index]); // Store the details of the last successful payment
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
    
    const handleGeneratePDF = () => {
        // Generate the PDF content dynamically using @react-pdf/renderer
        console.log('hello zair');
        const pdfContent = (
          <BillingPDF billingData={lastSuccessfulPayment ? [lastSuccessfulPayment] : []} />
        );
    
        // Inline styles for the link
        const linkStyle = {
            textDecoration: 'none',
            color: '#000',
            fontSize: '16px',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
        };
    
        // Return a PDFDownloadLink component to trigger the download
        return (
          <PDFDownloadLink document={pdfContent} fileName="billing.pdf">
            {({ loading }) => (
              <span style={linkStyle}>
                {loading ? 'Loading...' : 'Download PDF'}
              </span>
            )}
          </PDFDownloadLink>
        );
    };
    
      const formatCurrency = (value) => {
        // Convert value to a number
        const numericValue = parseFloat(value);
    
        // Check if the numericValue is a valid number
        if (!isNaN(numericValue)) {
            // Format the number with two decimal places and add "$" sign
            return `$${numericValue.toFixed(2)}`;
        } else {
            // If the value is not a valid number, return it as is
            return value;
        }
    };
    
    return (
        <div style={{ textAlign: 'center' }}>
            <Navbar />
                <button>{handleGeneratePDF()}</button>
            <div style={{ marginTop: '50px', marginBottom: '30px' }}> {/* Increased marginTop and marginBottom */}
            <input
                type="text"
                placeholder="Search by First Name"
                value={searchFirstName}
                onChange={(e) => setSearchFirstName(e.target.value)}
                style={{ marginRight: '50px' }} // Add margin between input and select
            />
            <input
                type="text"
                placeholder="Search by Last Name"
                value={searchLastName}
                onChange={(e) => setSearchLastName(e.target.value)}
                style={{ marginRight: '50px' }} // Add margin between input and select
            />
            <select
                id="amountSelect" // Assign an id to the select element
                value={selectedAmount}
                onChange={handleFilterChange}
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
                style={{ marginRight: '50px' }} // Add margin between input and select
            />
            <input
                type="text"
                placeholder="Invoice Number"
                value={invoiceNumberFilter}
                onChange={handleInvoiceNumberChange}
                style={{ marginRight: '50px' }} // Add margin between input and select
            />
            </div>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '95%', margin: 'auto', fontSize: '16px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Invoice Number</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>First Name</th> {/* New column for patient first name */}
                        <th style={{ border: '1px solid black', padding: '10px' }}>Last Name</th> {/* New column for patient last name */}
                        <th style={{ border: '1px solid black', padding: '10px' }}>Amount</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Date Charged</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Paid</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCharges.map((charge, index) => (
                        <tr key={charge.invoice_num}>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{charge.invoice_num}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{charge.patientFirstName}</td> {/* Display patient first name */}
                            <td style={{ border: '1px solid black', padding: '10px' }}>{charge.patientLastName}</td> {/* Display patient last name */}
                            <td style={{ border: '1px solid black', padding: '10px' }}>{formatCurrency(charge.amount)}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{charge.date_charged}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{formatCurrency(charge.paid)}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>
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