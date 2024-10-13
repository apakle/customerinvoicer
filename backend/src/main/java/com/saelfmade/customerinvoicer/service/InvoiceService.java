package com.saelfmade.customerinvoicer.service;

import com.saelfmade.customerinvoicer.model.Invoice;
import com.saelfmade.customerinvoicer.model.InvoicePosition;
import com.saelfmade.customerinvoicer.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
    	// Only return invoices where deleted = false
    	return invoiceRepository.findAllActiveInvoices();
    }

    public Invoice saveInvoice(Invoice invoice) {
    	// Generate the invoice number before saving
        String generatedInvoiceNumber = generateInvoiceNumber(invoice);
        invoice.setInvoiceNumber(generatedInvoiceNumber);
        return invoiceRepository.save(invoice);
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
        		.orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
    }
    
    public Invoice updateInvoice(Long id, Invoice updatedInvoice) {
        // Fetch the existing invoice
    	Invoice existingInvoice = getInvoiceById(id);    	
    	// Update all fields except the ID
        existingInvoice.setInvoiceNumber(updatedInvoice.getInvoiceNumber());
        existingInvoice.setInvoiceDate(updatedInvoice.getInvoiceDate());
        existingInvoice.setServiceDate(updatedInvoice.getServiceDate());
        existingInvoice.setDescription(updatedInvoice.getDescription());
        existingInvoice.setCustomer(updatedInvoice.getCustomer());
        
        // Update the positions: remove orphaned positions and add new ones
        existingInvoice.getPositions().clear();
        for (InvoicePosition position : updatedInvoice.getPositions()) {
            existingInvoice.addPosition(position); // This will automatically recalculate the totalAmount
        }
        
        // Save the updated invoice
        return invoiceRepository.save(existingInvoice);
    }

    public void deleteInvoice(Long id) {
    	Invoice invoice = getInvoiceById(id);
        invoice.setDeleted(true); // Mark the invoice as deleted
        invoiceRepository.save(invoice); // Save the updated state
    }
    
//	// Fetch invoices by year
//    public List<Invoice> getInvoicesByYear(int year) {
//        return invoiceRepository.findInvoicesByYear(year);
//    }
    
    // Generate the invoice number in the format "YY/N"
    private String generateInvoiceNumber(Invoice invoice) {
    	Date invoiceDate = invoice.getInvoiceDate();
    	// Convert Date to LocalDate
        LocalDate localDate  = invoiceDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        // Extract the year
        int invoiceYear = localDate.getYear();
        int invoiceYearNumber = invoiceYear % 100; // Get last two digits of the year
        int invoiceCount = invoiceRepository.countByYear(invoiceYear); 
        String invoiceNumber = invoiceYearNumber + "/" + (invoiceCount + 1); // Generate number as "YY/N"
        return invoiceNumber;
    }
}
