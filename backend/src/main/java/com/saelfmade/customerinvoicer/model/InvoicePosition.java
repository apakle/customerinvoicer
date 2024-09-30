package com.saelfmade.customerinvoicer.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class InvoicePosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int position;
    private int quantity;
    private String description;
    private double price;
    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    @JsonIgnore
    @OnDelete(action = OnDeleteAction.CASCADE)  // Hibernate-specific annotation
    private Invoice invoice;

    InvoicePosition() {}

    public InvoicePosition(int position, int quantity, String description, double price, Invoice invoice) {
        this.position = position;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.invoice = invoice;
        calculateTotalPrice();
    }
    
    // Automatically calculate totalPrice
    private void calculateTotalPrice() {
        this.totalPrice = this.quantity * this.price;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
        calculateTotalPrice(); // Recalculate when quantity changes
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
        calculateTotalPrice(); // Recalculate when price changes
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
}
