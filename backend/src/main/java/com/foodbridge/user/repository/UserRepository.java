package com.foodbridge.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.enums.Role;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    
    List<User> findByStatus(AccountStatus status);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
    
    Page<User> findByStatus(AccountStatus status, Pageable pageable);
    
    long countByStatus(AccountStatus status);

    long countByRole(Role role);

    long count();
    
    Page<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            String firstName,
            String lastName,
            Pageable pageable);
    
    Page<User> findByRole(
            Role role,
            Pageable pageable);


}