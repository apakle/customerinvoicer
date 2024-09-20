import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import InvoiceDetails from './components/InvoiceDetails';
import UserDetailsList from './components/UserDetailsList'; // Import the UserDetailsList component

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/customers">Customers</Link></li>
          <li><Link to="/create-customer">Create Customer</Link></li>
          <li><Link to="/invoices">Invoices</Link></li>
          <li><Link to="/create-invoice">Create Invoice</Link></li>
          <li><Link to="/userdetails">User Details</Link></li> 
        </ul>
      </nav>
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/create-customer" element={<CustomerForm />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/create-invoice" element={<InvoiceForm />} />
        <Route path="/invoices/:id" element={<InvoiceDetails />} />
        <Route path="/userdetails" element={<UserDetailsList />} /> 
      </Routes>
    </Router>
  );
}

export default App;
