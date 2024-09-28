package com.saelfmade.customerinvoicer.service;

import com.saelfmade.customerinvoicer.model.UserDetails;
import com.saelfmade.customerinvoicer.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public List<UserDetails> getAllUserDetails() {
        return userDetailsRepository.findAll();
    }

    public UserDetails saveUserDetails(UserDetails userDetails) {
        return userDetailsRepository.save(userDetails);
    }
    
    public UserDetails getUserDetailsById(Long id) {
        return userDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    public UserDetails updateUserDetails(Long id, UserDetails userDetails) {
        Optional<UserDetails> existingUserDetails = userDetailsRepository.findById(id);
        if (existingUserDetails.isPresent()) {
            UserDetails updatedUserDetails = existingUserDetails.get();
            updatedUserDetails.setName(userDetails.getName());
            updatedUserDetails.setAddress(userDetails.getAddress());
            updatedUserDetails.setPhoneNumber(userDetails.getPhoneNumber());
            updatedUserDetails.setIban(userDetails.getIban());
            updatedUserDetails.setBic(userDetails.getBic());
            updatedUserDetails.setBank(userDetails.getBank());
            updatedUserDetails.setTaxNumber(userDetails.getTaxNumber());
            return userDetailsRepository.save(updatedUserDetails);
        } else {
            throw new RuntimeException("UserDetails not found with id: " + id);
        }
    }

    public void deleteUserDetails(Long id) {
        userDetailsRepository.deleteById(id);
    }

}
