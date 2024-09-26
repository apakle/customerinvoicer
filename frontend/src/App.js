import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import InvoiceDetails from './components/InvoiceDetails';
import UserDetailsList from './components/UserDetailsList';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Customer Invoicer</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/customers">Customers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-customer">Create Customer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/invoices">Invoices</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-invoice">Create Invoice</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/userdetails">User Details</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/create-customer" element={<CustomerForm />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/create-invoice" element={<InvoiceForm />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
          <Route path="/userdetails" element={<UserDetailsList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
