package com.foodbridge.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
}