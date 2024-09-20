//package com.saelfmade.customerinvoicer;
//
//import java.util.Date;
//
//import com.saelfmade.customerinvoicer.model.Address;
//import com.saelfmade.customerinvoicer.model.Customer;
//import com.saelfmade.customerinvoicer.model.Invoice;
//import com.saelfmade.customerinvoicer.model.InvoicePosition_old;
//import com.saelfmade.customerinvoicer.model.UserDetails;
//
//public class CustomerInvoicerApp {
//
//	public static void main(String[] args) {
//		// Create a user (the app owner)
//        Address userAddress = new Address("Schopfheimer Str. 70", "79664", "Wehr");
//        UserDetails user = new UserDetails("Simone Haas", userAddress, "0172 xxxx", "DE26 xxxx xxxx");
//
//        // Create a customer
//        Address customerAddress = new Address("Schillerstr. 29", "79664", "Wehr");
//        Customer customer = new Customer("Christian", "Hoffelder", customerAddress);
//
//        // Create an invoice for the customer
//        Invoice invoice = new Invoice("24/9", new Date());
//
//        // Add positions to the invoice
//        invoice.addPosition(new InvoicePosition_old(1, 1, "Anfahrtspauschalen", 5.00));
//        invoice.addPosition(new InvoicePosition_old(2, 4, "Arbeitsstunden", 48.00));
//        invoice.addPosition(new InvoicePosition_old(3, 1, "Maschinen gesamt", 15.00));
//        invoice.addPosition(new InvoicePosition_old(4, 1, "Grünabfuhr", 15.00));
//
//        // Print total amount of the invoice
//        System.out.println("Total invoice amount: " + invoice.getTotalAmount());
//        
//        System.out.println(user);
//       
//
//	}
//
//}
