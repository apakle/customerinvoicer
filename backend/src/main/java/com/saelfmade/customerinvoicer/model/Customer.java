package com.saelfmade.customerinvoicer.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class Customer {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String firstName;
    private String lastName;
    
    @Embedded
    private Address address;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"customer"})
    private List<Invoice> invoices;
    
    Customer() {}

    public Customer(String firstName, String lastName, Address address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }
    
    public void addInvoice(Invoice invoice) {
        invoices.add(invoice);
        invoice.setCustomer(this);
    }

	public Long getId() {
		return id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}       
		
	public List<Invoice> getInvoices() {
		return invoices;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", address=" + address
				+ ", invoices=" + invoices + "]";
	}
}
