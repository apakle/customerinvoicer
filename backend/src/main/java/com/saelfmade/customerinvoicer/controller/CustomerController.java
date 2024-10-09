package com.saelfmade.customerinvoicer.controller;

import com.saelfmade.customerinvoicer.model.Customer;
import com.saelfmade.customerinvoicer.model.Invoice;
import com.saelfmade.customerinvoicer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.157:3000"})
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }
    
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
		return customerService.updateCustomer(id, customer);    	
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
    
    @PostMapping("/{id}/invoices")
    public Customer addInvoiceToCustomer(@PathVariable Long id, @RequestBody Invoice invoice) {
    	Customer customer = customerService.addInvoiceToCustomer(id, invoice);
    	return customer;
    }
    
}
