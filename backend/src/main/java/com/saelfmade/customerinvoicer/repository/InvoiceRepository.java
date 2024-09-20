package com.saelfmade.customerinvoicer.repository;

import com.saelfmade.customerinvoicer.model.Invoice;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    // Custom query to count invoices for the current year using native SQL
    @Query(value = "SELECT COUNT(*) FROM Invoice WHERE YEAR(date) = :year", nativeQuery = true)
    int countByYear(@Param("year") int year);
    
    // Custom query to fetch invoices for a specific year
    @Query(value = "SELECT * FROM Invoice WHERE YEAR(date) = :year", nativeQuery = true)
    List<Invoice> findInvoicesByYear(@Param("year") int year);
}
