package com.saelfmade.customerinvoicer.model;

import jakarta.persistence.*;

@Entity
public class UserDetails {    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Embedded
    private Address address;
    
    private String phoneNumber;
    private String iban;
    private String bank;
    private String bic;
    private String taxNumber;

    public UserDetails() {}
    
    public UserDetails(String name, Address address, String phoneNumber, String iban, String bank, String bic, String taxNumber) {
		this.name = name;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.iban = iban;
		this.bank = bank;
		this.bic = bic;
		this.taxNumber = taxNumber;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public String getBic() {
		return bic;
	}

	public void setBic(String bic) {
		this.bic = bic;
	}

	public String getTaxNumber() {
		return taxNumber;
	}

	public void setTaxNumber(String taxNumber) {
		this.taxNumber = taxNumber;
	}
}
