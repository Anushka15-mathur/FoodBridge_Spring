package com.foodbridge.auth.entity;

import java.time.LocalDateTime;

import com.foodbridge.user.entity.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "password_reset_otps")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 6, nullable = false)
    private String otp;

    @Column(nullable = false)
    private LocalDateTime expiryTime;

    @Column(nullable = false)
    private boolean verified;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}