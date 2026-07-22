package com.foodbridge.donor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.donor.entity.Donor;
import com.foodbridge.user.entity.User;

public interface DonorRepository extends JpaRepository<Donor, Long> {

    Optional<Donor> findByUser(User user);

    boolean existsByOrganizationName(String organizationName);

}