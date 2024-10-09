package com.saelfmade.customerinvoicer.service;

import com.saelfmade.customerinvoicer.model.Customer;
import com.saelfmade.customerinvoicer.model.Invoice;
import com.saelfmade.customerinvoicer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
        		.orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
    }
    
    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        Customer existingCustomer = getCustomerById(id);
        existingCustomer.setFirstName(updatedCustomer.getFirstName());
        existingCustomer.setLastName(updatedCustomer.getLastName());
        existingCustomer.setAddress(updatedCustomer.getAddress());
        return customerRepository.save(existingCustomer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
    
    public Customer addInvoiceToCustomer(Long id, Invoice invoice) {    	
    	Customer customer = getCustomerById(id);    	
    	// Use the bidirectional management to ensure both sides of the relationship are updated
        customer.addInvoice(invoice); // Adds invoice to customer and sets customer on the invoice
        // Link each position to the invoice
        invoice.getPositions().forEach(position -> position.setInvoice(invoice));
        
        return customerRepository.save(customer);    	    	
    }
}
