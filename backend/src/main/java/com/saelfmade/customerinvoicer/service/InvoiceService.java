package com.saelfmade.customerinvoicer.service;

import com.saelfmade.customerinvoicer.model.Invoice;
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
        return invoiceRepository.findAll();
    }

    public Invoice saveInvoice(Invoice invoice) {
    	// Generate the invoice number before saving
        String generatedInvoiceNumber = generateInvoiceNumber(invoice);
        invoice.setInvoiceNumber(generatedInvoiceNumber);
        return invoiceRepository.save(invoice);
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id).orElse(null);
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
    
	// Fetch invoices by year
    public List<Invoice> getInvoicesByYear(int year) {
        return invoiceRepository.findInvoicesByYear(year);
    }
    
    // Generate the invoice number in the format "YY/N"
    private String generateInvoiceNumber(Invoice invoice) {
    	Date invoiceDate = invoice.getDate();
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
