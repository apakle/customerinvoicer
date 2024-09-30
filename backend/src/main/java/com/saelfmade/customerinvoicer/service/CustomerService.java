package com.saelfmade.customerinvoicer.service;

import com.saelfmade.customerinvoicer.model.Customer;
import com.saelfmade.customerinvoicer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        return customerRepository.findById(id).orElse(null);
    }
    
    public Customer updateCustomer(Long id, Customer customer) {
    	Optional<Customer> existingCustomer = customerRepository.findById(id);
    	if (existingCustomer.isPresent()) {
    		Customer updatedCustomer = existingCustomer.get();
    		updatedCustomer.setFirstName(customer.getFirstName());
    		updatedCustomer.setLastName(customer.getLastName());
    		updatedCustomer.setAddress(customer.getAddress());    		
    		return customerRepository.save(updatedCustomer);
    	} else {
            throw new RuntimeException("Customer not found with id: " + id);
        }    	
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
