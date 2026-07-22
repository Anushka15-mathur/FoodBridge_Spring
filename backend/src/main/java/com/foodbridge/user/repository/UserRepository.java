package com.foodbridge.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.AccountStatus;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    
    List<User> findByStatus(AccountStatus status);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
}