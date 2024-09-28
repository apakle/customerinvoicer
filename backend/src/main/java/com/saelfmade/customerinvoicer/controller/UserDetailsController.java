package com.saelfmade.customerinvoicer.controller;

import com.saelfmade.customerinvoicer.model.UserDetails;
import com.saelfmade.customerinvoicer.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userdetails")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.157:3000"})
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping
    public List<UserDetails> getAllUserDetails() {
        return userDetailsService.getAllUserDetails();
    }

    @PostMapping
    public UserDetails createUserDetails(@RequestBody UserDetails userDetails) {
        return userDetailsService.saveUserDetails(userDetails);
    }
    
    @GetMapping("/{id}")
    public UserDetails getUserDetailsById(@PathVariable Long id) {
        return userDetailsService.getUserDetailsById(id);
    }
    
    @PutMapping("/{id}")
    public UserDetails updateUserDetails(@PathVariable Long id, @RequestBody UserDetails userDetails) {
        return userDetailsService.updateUserDetails(id, userDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteUserDetails(@PathVariable Long id) {
        userDetailsService.deleteUserDetails(id);
    }
}
