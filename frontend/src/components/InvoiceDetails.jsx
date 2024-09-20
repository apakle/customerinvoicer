import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InvoiceDetails = () => {
    const { id } = useParams(); // Get invoice ID from the route
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        // Fetch invoice by ID
        axios.get(`http://localhost:8080/api/invoices/${id}`)
            .then(response => setInvoice(response.data))
            .catch(error => console.error('Error fetching invoice:', error));
    }, [id]);

    if (!invoice) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Invoice Details</h1>
            <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
            <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> {invoice.totalAmount.toFixed(2)}</p>
            <p><strong>Customer:</strong> {invoice.customer.firstName} {invoice.customer.lastName}</p>

            <h2>Positions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.positions.map(position => (
                        <tr key={position.id}>
                            <td>{position.position}</td>
                            <td>{position.quantity}</td>
                            <td>{position.description}</td>
                            <td>{position.price.toFixed(2)}</td>
                            <td>{position.totalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceDetails;
