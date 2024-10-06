package com.saelfmade.customerinvoicer.model;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class Invoice {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private String invoiceNumber;
    private Date invoiceDate;
    private Date serviceDate;
    private String description;
    
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvoicePosition> positions = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
    private double totalAmount;
    
    Invoice() {}

    public Invoice(Date invoiceDate, Date serviceDate, double totalAmount, Customer customer) {
        this.invoiceDate = invoiceDate;
        this.serviceDate = serviceDate;
        this.totalAmount=totalAmount;
        this.customer = customer;
    }

    public void addPosition(InvoicePosition position) {
        positions.add(position);
        position.setInvoice(this);
        calculateTotalAmount();
    }

    // Automatically calculate the total amount of the invoice
    private void calculateTotalAmount() {
        totalAmount = positions.stream()
                .mapToDouble(InvoicePosition::getTotalPrice)
                .sum();
    }

	public Long getId() {
		return id;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public Date getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public List<InvoicePosition> getPositions() {
		return positions;
	}

	public void setPositions(List<InvoicePosition> positions) {
		this.positions = positions;
		calculateTotalAmount(); // Recalculate total when positions are set
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}  
	
	public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public Date getServiceDate() {
		return serviceDate;
	}

	public void setServiceDate(Date serviceDate) {
		this.serviceDate = serviceDate;
	}
	
	@Override
	public String toString() {
		return "Invoice [id=" + id + ", invoiceNumber=" + invoiceNumber + ", invoiceDate=" + invoiceDate
				+ ", serviceDate=" + serviceDate + ", description=" + description + ", positions=" + positions
				+ ", customer=" + customer + ", totalAmount=" + totalAmount + "]";
	}	
}
