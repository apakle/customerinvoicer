import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const InvoiceForm = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { id } = useParams();
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [positions, setPositions] = useState([{ position: 1, quantity: '', description: '', price: '' }]);
    const [invoice, setInvoice] = useState({ invoiceDate: new Date().toISOString().split('T')[0], serviceDate: '', description: '', positions: [] });

    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch customers for selection
        axios.get(`${backendUrl}/api/customers`)
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    }, [backendUrl]);

    useEffect(() => {
        if (id) {
          setIsEdit(true); // Set form to edit mode if there's an ID
          axios.get(`${backendUrl}/api/invoices/${id}`)
            .then(response => {
                const fetchedInvoice = response.data;
                setInvoice({
                    invoiceNumber: fetchedInvoice.invoiceNumber,
                    invoiceDate: new Date(fetchedInvoice.invoiceDate).toLocaleDateString('en-CA'),                        
                    serviceDate: new Date(fetchedInvoice.serviceDate).toLocaleDateString('en-CA'),
                    description: fetchedInvoice.description,
                    positions: fetchedInvoice.positions,
                });
                setSelectedCustomerId(fetchedInvoice.customer.id); 
                setPositions(fetchedInvoice.positions);
            })
            .catch(error => console.error('Error fetching invoice:', error));
        } else {
          // Reset the form if there's no ID
          setIsEdit(false);          
        }
      }, [id, backendUrl]); 

    const handleCustomerChange = (event) => {
        setSelectedCustomerId(event.target.value);
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
        if (!selectedCustomerId) {
            alert('Please select a customer.');
            return;
        }

        if (positions.length === 0 || positions.some(position => !position.quantity || !position.description || !position.price)) {
            alert('Please add at least one valid position.');
            return;
        }
        
        const invoiceData = {
            ...invoice,
            positions: positions.map(p => ({
                position: p.position,
                quantity: p.quantity,
                description: p.description,
                price: p.price
            }))
        };

        if (isEdit) {
            invoiceData.customer = { id: selectedCustomerId };
        }

        const request = isEdit
            ? axios.put(`${backendUrl}/api/invoices/${id}`, invoiceData) // Use PUT if updating
            : axios.post(`${backendUrl}/api/invoices/customer/${selectedCustomerId}`, invoiceData); // Use POST if creating

        request
            .then(response => {
                console.log('Invoice processed:', response.data);
                const processedInvoiceId = response.data.id;
                navigate(`/invoices/${processedInvoiceId}`);
            })
            .catch(error => console.error('Error processing invoice:', error));
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2>{isEdit ? `Rechnung ${invoice.invoiceNumber} bearbeiten` : 'Rechnung erstellen'}</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="mt-3">
                    {/* Customer and Date Fields */}
                    <div className="row g-3 mb-3">
                        <div className="col-md-4 col-12">
                            <label htmlFor="customer" className="form-label">Kunde:</label>
                            <select id="customer" value={selectedCustomerId} onChange={handleCustomerChange} className="form-select w-100" required>
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
                    <button type="submit" className="btn btn-primary">{isEdit ? 'Rechnung aktualisieren' : 'Rechnung erstellen'}</button>
                </form>
            </div>
        </div>
    );
};

export default InvoiceForm;