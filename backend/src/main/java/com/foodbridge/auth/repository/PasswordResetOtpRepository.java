package com.foodbridge.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.auth.entity.PasswordResetOtp;
import com.foodbridge.user.entity.User;

public interface PasswordResetOtpRepository
        extends JpaRepository<PasswordResetOtp, Long> {

    Optional<PasswordResetOtp> findByUser(User user);

    void deleteByUser(User user);
}