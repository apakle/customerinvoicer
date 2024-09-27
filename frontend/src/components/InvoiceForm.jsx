import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [positions, setPositions] = useState([{ position: 1, quantity: '', description: '', price: '' }]);
    const [invoice, setInvoice] = useState({ invoiceDate: new Date().toISOString().split('T')[0], serviceDate: '', description: '', positions: [] });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch customers for selection
        axios.get(`${backendUrl}/api/customers`)
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    }, [backendUrl]);

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

        axios.post(`${backendUrl}/api/invoices/customer/${selectedCustomer}`, { ...invoice, customerId: selectedCustomer })
            .then(response => {
                console.log('Invoice created:', response.data);
                const createdInvoiceId = response.data.id;
                navigate(`/invoices/${createdInvoiceId}`);
            })
            .catch(error => console.error('Error creating invoice:', error));
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h2>Rechnung erstellen</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="mt-3">
                        {/* Customer and Date Fields */}
                        <div className="row g-3 mb-3">
                            <div className="col-md-4 col-12">
                                <label htmlFor="customer" className="form-label">Kunde:</label>
                                <select id="customer" value={selectedCustomer} onChange={handleCustomerChange} className="form-select w-100" required>
                                    <option value="">Wähle einen Kunden</option>
                                    {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.firstName} {customer.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 col-12">
                                <label htmlFor="invoiceDate" className="form-label">Rechnungsdatum:</label>
                                <input
                                    type="date"
                                    id="invoiceDate"
                                    name="invoiceDate"
                                    value={invoice.invoiceDate}
                                    onChange={handleInvoiceChange}
                                    className="form-control w-100"
                                    required
                                />
                            </div>
                            <div className="col-md-4 col-12">
                                <label htmlFor="serviceDate" className="form-label">Leistungsdatum:</label>
                                <input
                                    type="date"
                                    id="serviceDate"
                                    name="serviceDate"
                                    value={invoice.serviceDate}
                                    onChange={handleInvoiceChange}
                                    className="form-control w-100"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Description */}
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
                        
                        {/* Positions Table */}
                        <div className="mb-3">
                            <h3>Positionen</h3>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Position</th>
                                            <th>Menge</th>
                                            <th>Beschreibung</th>
                                            <th>Preis</th>
                                            <th>Aktion</th>
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
                                                        placeholder="Menge"
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
                                                        placeholder="Beschreibung"
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
                                                        placeholder="Preis"
                                                        min="0"
                                                        step="0.01"
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-danger" onClick={() => removePosition(index)}>Entfernen</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" className="btn btn-success" onClick={addPosition}>Position hinzufügen</button>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary">Rechnung erstellen</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;
