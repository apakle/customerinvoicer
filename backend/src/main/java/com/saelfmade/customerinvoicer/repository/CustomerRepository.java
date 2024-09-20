package com.saelfmade.customerinvoicer.repository;

import com.saelfmade.customerinvoicer.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
