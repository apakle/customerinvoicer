package com.saelfmade.customerinvoicer.repository;

import com.saelfmade.customerinvoicer.model.Address;
import com.saelfmade.customerinvoicer.model.Customer;
import com.saelfmade.customerinvoicer.model.Invoice;
import com.saelfmade.customerinvoicer.model.InvoicePosition;
import com.saelfmade.customerinvoicer.repository.InvoiceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
@ActiveProfiles("test")
public class InvoiceRepositoryTest {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Test
    @Transactional
    public void testCreateInvoice() {
    	Address customerAddress = new Address("Schillerstr. 29", "79664", "Wehr");
    	Customer customer = new Customer("Christian", "Hoffelder", customerAddress);
        Invoice invoice = new Invoice("INV-002", new Date(), new Date(), 150, customer);
        invoiceRepository.save(invoice);
        
        System.out.println("Created Invoice ID: " + invoice.getId());
        
        // Verify that the invoice is saved
        assertThat(invoiceRepository.findById(invoice.getId())).isPresent();
    }
}
