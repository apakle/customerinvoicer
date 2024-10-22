package com.saelfmade.customerinvoicer.controller;

import com.saelfmade.customerinvoicer.model.AuthenticationRequest;
import com.saelfmade.customerinvoicer.model.AuthenticationResponse;
import com.saelfmade.customerinvoicer.model.UserDetails;
import com.saelfmade.customerinvoicer.security.CustomUserDetailsService;
import com.saelfmade.customerinvoicer.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.157:3000"})
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request) throws Exception {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("Invalid username or password");
        }

        final org.springframework.security.core.userdetails.UserDetails userDetails = 
            userDetailsService.loadUserByUsername(request.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return new AuthenticationResponse(jwt);
    }

    @PostMapping("/register")
    public String register(@RequestBody UserDetails userDetails) {
        userDetails.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        userDetailsService.saveUser(userDetails);
        return "User registered successfully!";
    }
}
