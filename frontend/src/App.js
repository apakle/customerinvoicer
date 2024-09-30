import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import InvoiceDetails from './components/InvoiceDetails';
import UserDetailsList from './components/UserDetailsList';
import UserDetailsForm from './components/UserDetailsForm';

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-1 mt-auto">
      <div className="container">
        <p style={{ fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} Customer Invoicer | Alle Rechte vorbehalten
        </p>
        <p style={{ fontSize: '12px' }}>
          <Link to="/contact" className="text-light">Kontakt</Link> | 
          <Link to="/privacy" className="text-light"> Datenschutzbestimmungen</Link>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ fontSize: '30px' }}>Customer Invoicer</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/customers">Kunden</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-customer">Kunde anlegen</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/invoices">Rechnungen</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-invoice">Rechnung erstellen</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/userdetails">Benutzerdaten</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4 flex-grow-1">
        <Routes>
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/create-customer" element={<CustomerForm />} />
          <Route path="/customers/:id/edit" element={<CustomerForm />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/create-invoice" element={<InvoiceForm />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
          <Route path="/invoices/:id/edit" element={<InvoiceForm />} />
          <Route path="/userdetails" element={<UserDetailsList />} />
          <Route path="/create-user" element={<UserDetailsForm />} />
          <Route path="/userdetails/:id/edit" element={<UserDetailsForm />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;