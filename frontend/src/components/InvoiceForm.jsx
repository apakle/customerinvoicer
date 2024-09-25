import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [positions, setPositions] = useState([{ position: 1, quantity: '', description: '', price: '' }]);
    const [invoice, setInvoice] = useState({ invoiceDate: new Date().toISOString().split('T')[0], serviceDate: '', description: '', positions: [] });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch customers for selection
        axios.get('http://localhost:8080/api/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };

    const handleInvoiceChange = (event) => {
        const { name, value } = event.target;
        setInvoice(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePositionChange = (index, event) => {
        const { name, value } = event.target;
        const updatedPositions = [...positions];
        updatedPositions[index] = { ...updatedPositions[index], [name]: value };
        setPositions(updatedPositions);
        setInvoice(prevState => ({ ...prevState, positions: updatedPositions }));
    };

    const addPosition = () => {
        setPositions([...positions, { position: positions.length + 1, quantity: '', description: '', price: '' }]);
    };

    const removePosition = (index) => {
        const updatedPositions = positions.filter((_, i) => i !== index).map((position, i) => ({
            ...position,
            position: i + 1  // Reassign position numbers after removal
        }));
        setPositions(updatedPositions);
        setInvoice(prevState => ({ ...prevState, positions: updatedPositions }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedCustomer) {
            alert('Please select a customer.');
            return;
        }

        if (positions.length === 0 || positions.some(position => !position.quantity || !position.description || !position.price)) {
            alert('Please add at least one valid position.');
            return;
        }

        axios.post(`http://localhost:8080/api/invoices/customer/${selectedCustomer}`, { ...invoice, customerId: selectedCustomer })
            .then(response => {
                console.log('Invoice created:', response.data);
                const createdInvoiceId = response.data.id;
                navigate(`/invoices/${createdInvoiceId}`);
            })
            .catch(error => console.error('Error creating invoice:', error));
    };

    return (
        <div className="container mt-4">
            <h1>Create Invoice</h1>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="d-flex gap-3 mb-3">
                    <div className="mb-3">
                        <label htmlFor="customer" className="form-label">Customer:</label>
                        <select id="customer" value={selectedCustomer} onChange={handleCustomerChange} className="form-select w-auto" required>
                            <option value="">Select a customer</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.firstName} {customer.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Rechnungsdatum:</label>
                        <input
                            type="date"
                            id="invoiceDate"
                            name="invoiceDate"
                            value={invoice.invoiceDate}
                            onChange={handleInvoiceChange}
                            className="form-control w-auto"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Leistungsdatum:</label>
                        <input
                            type="date"
                            id="serviceDate"
                            name="serviceDate"
                            value={invoice.serviceDate}
                            onChange={handleInvoiceChange}
                            className="form-control w-auto"
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Leistungsbeschreibung:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={invoice.description}
                        onChange={handleInvoiceChange}
                        className="form-control"
                        placeholder="Hier kann eine zusätzliche Beschreibung hinzugefügt werden"
                    />
                </div>
                <div className="mb-3">
                    <h3>Positions</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {positions.map((position, index) => (
                                <tr key={index}>
                                    <td>{position.position}</td>
                                    <td>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={position.quantity}
                                            onChange={(e) => handlePositionChange(index, e)}
                                            className="form-control"
                                            placeholder="Quantity"
                                            min="1"
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="description"
                                            value={position.description}
                                            onChange={(e) => handlePositionChange(index, e)}
                                            className="form-control"
                                            placeholder="Description"
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="price"
                                            value={position.price}
                                            onChange={(e) => handlePositionChange(index, e)}
                                            className="form-control"
                                            placeholder="Price"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={() => removePosition(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success" onClick={addPosition}>Add Position</button>
                </div>
                <button type="submit" className="btn btn-primary">Create Invoice</button>
            </form>
        </div>
    );
};

export default InvoiceForm;
