package com.saelfmade.customerinvoicer.repository;

import com.saelfmade.customerinvoicer.model.UserDetails;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
	// Custom native query to find a user by username
    @Query(value = "SELECT * FROM user_details WHERE username = :username", nativeQuery = true)
    Optional<UserDetails> findByName(@Param("username") String username);
}
