//package com.saelfmade.customerinvoicer;
//
//import java.util.Date;
//
//import com.saelfmade.customerinvoicer.model.Address;
//import com.saelfmade.customerinvoicer.model.Customer;
//import com.saelfmade.customerinvoicer.model.Invoice;
//import com.saelfmade.customerinvoicer.model.InvoicePosition;
//import com.saelfmade.customerinvoicer.model.UserDetails;
//
//public class CustomerInvoicerApp {
//
//	public static void main(String[] args) {
//		
//        // Create a customer
//        Address customerAddress = new Address("Schillerstr. 29", "79664", "Wehr");
//        Customer customer = new Customer("Christian", "Hoffelder", customerAddress);
//
//        // Create an invoice for the customer
//        Invoice invoice = new Invoice("INV-002", new Date(), new Date(), 150, customer);
//
//        // Add positions to the invoice
//        invoice.addPosition(new InvoicePosition(1, 1, "Anfahrtspauschalen", 5.00, invoice));
//        invoice.addPosition(new InvoicePosition(2, 4, "Arbeitsstunden", 48.00, invoice));
//        invoice.addPosition(new InvoicePosition(3, 1, "Maschinen gesamt", 15.00, invoice));
//        invoice.addPosition(new InvoicePosition(4, 1, "Grünabfuhr", 15.00, invoice));
//
//        // Print total amount of the invoice
//        System.out.println("Total invoice amount: " + invoice.getTotalAmount());
//        System.out.println(invoice);
//              
//
//	}
//
//}
