package com.saelfmade.customerinvoicer.repository;

import com.saelfmade.customerinvoicer.model.Address;
import com.saelfmade.customerinvoicer.model.Customer;
import com.saelfmade.customerinvoicer.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest // This annotation is ideal for testing JPA repositories
@ActiveProfiles("test")
class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void testCustomerPersistence() {
        // Arrange
        Address address = new Address("123 Main St", "62701", "Springfield");
        Customer customer = new Customer("bubi", "b", address);

        // Act
        Customer savedCustomer = customerRepository.save(customer);

        // Assert
        assertNotNull(savedCustomer);
        assertNotNull(savedCustomer.getId());

        // Print saved customer to console for debugging
        System.out.println("Saved Customer: " + savedCustomer);
        
        try {
            Thread.sleep(30000); // Pause for 30 seconds to inspect the H2 console
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
