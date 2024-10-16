package com.saelfmade.customerinvoicer.repository;

import com.saelfmade.customerinvoicer.model.Invoice;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
	
	// Custom query to fetch all invoices where deleted = false
	@Query(value = "SELECT * FROM Invoice WHERE deleted = false", nativeQuery = true)
	List<Invoice> findAllActiveInvoices();

    // Custom query to count invoices for the current year using native SQL
    @Query(value = "SELECT COUNT(*) FROM Invoice WHERE YEAR(invoice_date) = :year", nativeQuery = true)
    int countByYear(@Param("year") int year);
    
    // Custom query to fetch an invoice by id where deleted = false
    @Query(value = "SELECT * FROM Invoice WHERE id = :id AND deleted = false", nativeQuery = true)
    Optional<Invoice> findByIdAndNotDeleted(@Param("id") Long id);
    
//    // Custom query to fetch invoices for a specific year
//    @Query(value = "SELECT * FROM Invoice WHERE YEAR(invoice_date) = :year", nativeQuery = true)
//    List<Invoice> findInvoicesByYear(@Param("year") int year);
}
