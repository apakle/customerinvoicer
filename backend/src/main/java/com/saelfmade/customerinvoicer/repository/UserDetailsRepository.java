package com.saelfmade.customerinvoicer.repository;

import com.saelfmade.customerinvoicer.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
}
