import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateInvoice = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [positions, setPositions] = useState([{ position: 1, quantity: '', description: '', price: '' }]);
    const [invoice, setInvoice] = useState({ date: '', positions: [] });

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
        const newPositionNumber = positions.length + 1;
        setPositions([...positions, { position: newPositionNumber, quantity: '', description: '', price: '' }]);
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
                // Reset form or redirect
            })
            .catch(error => console.error('Error creating invoice:', error));
    };

    return (
        <div>
            <h1>Create Invoice</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={invoice.date}
                        onChange={handleInvoiceChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="customer">Customer:</label>
                    <select id="customer" value={selectedCustomer} onChange={handleCustomerChange} required>
                        <option value="">Select a customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <h3>Positions</h3>
                    {positions.map((position, index) => (
                        <div key={index} className="position">
                            <input
                                type="text"
                                name="position"
                                value={position.position}
                                placeholder="Position"
                                readOnly
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={position.quantity}
                                onChange={(e) => handlePositionChange(index, e)}
                                placeholder="Quantity"
                                min="1"
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                value={position.description}
                                onChange={(e) => handlePositionChange(index, e)}
                                placeholder="Description"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={position.price}
                                onChange={(e) => handlePositionChange(index, e)}
                                placeholder="Price"
                                min="0"
                                step="0.01"
                                required
                            />
                            <button type="button" onClick={() => removePosition(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addPosition}>Add Position</button>
                </div>
                <button type="submit">Create Invoice</button>
            </form>
        </div>
    );
};

export default CreateInvoice;
