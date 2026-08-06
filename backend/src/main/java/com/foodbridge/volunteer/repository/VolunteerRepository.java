package com.foodbridge.volunteer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.user.entity.User;
import com.foodbridge.volunteer.entity.Volunteer;

public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

    Optional<Volunteer> findByUser(User user);

    List<Volunteer> findByAvailableTrue();

    List<Volunteer> findByVerifiedTrue();

    List<Volunteer> findByAvailableTrueAndVerifiedTrue();

    List<Volunteer> findByAvailableTrueAndVerifiedTrueAndIsDeletedFalse();


}