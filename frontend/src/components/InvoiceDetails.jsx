import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import '../styles/InvoiceDetails.css';   // Custom CSS for print styles

const InvoiceDetails = () => {
    const { id } = useParams();  // Get invoice ID from the route
    const [invoice, setInvoice] = useState(null);
    const [users, setUsers] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        // Fetch invoice by ID
        axios.get(`http://localhost:8080/api/invoices/${id}`)
            .then(response => setInvoice(response.data))
            .catch(error => console.error('Error fetching invoice:', error));
    }, [id]);

    useEffect(() => {
        // Fetch user details
        axios.get('http://localhost:8080/api/userdetails')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching user details:', error));
    }, []);

    if (!invoice) {
        return <div>Loading...</div>;
    }

    const handlePrint = () => {
        window.print();  // Trigger browser print dialog
    };

    const formatIBAN = (iban) => {
        return iban ? iban.replace(/(.{4})/g, '$1 ').trim() : ''; 
    };
    const formattedIban = formatIBAN(users[0]?.bankAccount);

    // Display version for the screen
    const DisplayVersion = () => (
        <div className="display-version">
            <div className="position-relative d-flex justify-content-center align-items-center mb-3" style={{ height: '60px' }}>
                <button className="btn btn-secondary position-absolute start-0" onClick={() => navigate('/invoices')}>
                    Zurück zu allen Rechnungen
                </button>
                <h1 className="text-center">Rechnung {invoice.invoiceNumber}</h1>
            </div>
            <div className="row mt-4">
                <div className="col-6">
                    <div><strong>Kunde:</strong></div>
                    <div>{invoice.customer.firstName} {invoice.customer.lastName}</div>
                    <div>{invoice.customer.address.street}</div>
                    <div>{invoice.customer.address.zip} {invoice.customer.address.city}</div>
                </div>
            </div>
             {/* Row for Invoice Number and Date */}
            <div className="row mt-3 justify-content-between">
                <div className="col-auto">
                    <p><strong>Rechnung Nr.:</strong> {invoice.invoiceNumber}</p>
                </div>
                <div className="col-auto text-end">
                    <div><strong>Rechnungsdatum:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</div>
                    <div><strong>Leistungsdatum:</strong> {new Date(invoice.serviceDate).toLocaleDateString()}</div>
                </div>
            </div>
            <p className="mt-3 mb-4"><strong>Leistungsbeschreibung:</strong> {invoice.description}</p>

            <table className="table table-bordered table-striped mt-2">
                <thead className="table-dark">
                    <tr>
                        <th>Pos</th>
                        <th>Menge</th>
                        <th>Leistung</th>
                        <th>Einzelpreis (€)</th>
                        <th >Gesamtpreis (€)</th>
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

            <div className="row">
                <div className="col text-end">
                    <h4><strong>Rechnungsbetrag: </strong>{invoice.totalAmount.toFixed(2)} €</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-6 mt-5">
                    <p className="text-muted"> Hinweis: Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird Umsatzsteuer nicht berechnet.</p>
                    <p><u><strong> Zahlbar innerhalb 10 Tagen ohne Abzug</strong></u></p>
                </div>
                <div className="col-6 mt-5">
                    <div><strong>IBAN:</strong> {formattedIban}</div>
                    <div><strong>Bankverbindung:</strong> Volksbank Rhein-Wehra eG, <strong>BIC:</strong> GENODE61BSK</div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={handlePrint}>Print Invoice</button>
                </div>
            </div>
        </div>
    );

    // Print version for printing only
    const PrintVersion = () => (
        <div className="print-version">
            <p style={{ fontSize: '0.6rem' }}><u>{users[0]?.name} • {users[0]?.address.street} • {users[0]?.address.zip} {users[0]?.address.city}</u></p>
            <div className="row mt-4">
              <div className="customer-info col-3">
                <div>An</div>
                <div>{invoice.customer.firstName} {invoice.customer.lastName}</div>
                <div>{invoice.customer.address.street}</div>
                <div>{invoice.customer.address.zip} {invoice.customer.address.city}</div>
              </div>              
              <div className="col-5"></div>
              <div className="company-info col-4">
                <div>{users[0]?.name}</div>
                <div>{users[0]?.address.street}</div>
                <div>{users[0]?.address.zip} {users[0]?.address.city}</div>
                <div>Mobil: {users[0]?.phoneNumber}</div>
                <div>St.Nr.: {users[0]?.taxNumber}</div>
              </div>
            </div>
            <div className="date-info mt-5 text-end">
                <p>Wehr, den {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
            </div>
            <p className="mt-4"><strong>Rechnung Nr.:</strong> {invoice.invoiceNumber}</p>
            <p className="mt-5">Für ihren Auftrag bedanke ich mich und berechne für meine Leistungen am {new Date(invoice.serviceDate).toLocaleDateString()}:</p>

            <table className="table mt-5" style={{ fontSize: '0.9rem' }}>
                <thead>
                    <tr>
                        <th className="py-1">Pos <br/>&nbsp;</th>
                        <th className="py-1">Menge <br/>&nbsp;</th>
                        <th className="py-1 text-start">Leistung <br/>&nbsp;</th>
                        <th className="py-1 text-end">Einzelpreis <br/>(Euro)</th>
                        <th className="py-1 text-end">Gesamtpreis <br/>(Euro)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Add invoice.description if it exists */}
                    {invoice.description && (
                        <tr>
                            <td/>
                            <td/>
                            <td className="py-3 text-start"><strong><u>{invoice.description}</u></strong></td>
                            <td/>
                            <td/>
                        </tr>
                    )}
                    {invoice.positions.map(position => (
                        <tr key={position.id}>
                            <td className="py-1">{position.position}</td>
                            <td className="py-1">{position.quantity}</td>
                            <td className="py-1 text-start">{position.description}</td>
                            <td className="py-1 text-end">{position.price.toFixed(2)}</td>
                            <td className="py-1 text-end">{position.totalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                     {/* Total Amount Row */}
                    <tr className="total-amount-row">
                        <td colSpan="4" className="text-end"><strong>Rechnungsbetrag:</strong></td>
                        <td className="total-amount-cell text-end"><strong>{invoice.totalAmount.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>

            <div className="row">
                <p className="text-muted mt-3" style={{ fontSize: '0.9rem' }}> Hinweis: Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird Umsatzsteuer nicht berechnet.</p>
                <p className="mt-3">Mit freundlichen Grüßen</p>
                <div className="footer-payment ms-5">
                    <p className="mt-5"><u><strong> Zahlbar innerhalb 10 Tagen ohne Abzug</strong></u></p>
                    <div className="ms-5" style={{ fontSize: '0.9rem' }}>
                        <div><strong>IBAN:</strong> {formattedIban}</div>
                        <div><strong>Bankverbindung:</strong> Volksbank Rhein-Wehra eG, <strong>BIC:</strong> GENODE61BSK</div>
                    </div> 
                </div>               
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            <DisplayVersion />
            <PrintVersion />
        </div>
    );
};

export default InvoiceDetails;
