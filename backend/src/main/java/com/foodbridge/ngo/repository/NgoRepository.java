package com.foodbridge.ngo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.ngo.entity.Ngo;
import com.foodbridge.user.entity.User;

public interface NgoRepository extends JpaRepository<Ngo, Long> {

    Optional<Ngo> findByUser(User user);

    boolean existsByRegistrationNumber(String registrationNumber);

    boolean existsByNgoName(String ngoName);

    Optional<Ngo> findByPlaceId(String placeId);

}