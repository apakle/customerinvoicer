package com.saelfmade.customerinvoicer.controller;

import com.saelfmade.customerinvoicer.model.Customer;
import com.saelfmade.customerinvoicer.model.Invoice;
import com.saelfmade.customerinvoicer.service.CustomerService;
import com.saelfmade.customerinvoicer.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.157:3000"})
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;
    
    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @PostMapping("/customer/{customerId}")
    public Invoice createInvoice(@PathVariable Long customerId, @RequestBody Invoice invoice) {
    	Customer customer = customerService.getCustomerById(customerId);    	
    	// Use the bidirectional management to ensure both sides of the relationship are updated
        customer.addInvoice(invoice); // Adds invoice to customer and sets customer on the invoice
        // Link each position to the invoice
        invoice.getPositions().forEach(position -> position.setInvoice(invoice));        
        // Save the invoice via the service
        return invoiceService.saveInvoice(invoice);
    }

    @GetMapping("/{id}")
    public Invoice getInvoice(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id);
    }
    
    @PutMapping("/{id}")
    public Invoice updateInvoice(@PathVariable Long id, @RequestBody Invoice updatedInvoice) {
    	return invoiceService.updateInvoice(id, updatedInvoice);
    }

    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
    }
    
//    @GetMapping("/year/{year}")
//    public List<Invoice> getInvoicesByYear(@PathVariable int year) {
//        return invoiceService.getInvoicesByYear(year);
//    }
}
