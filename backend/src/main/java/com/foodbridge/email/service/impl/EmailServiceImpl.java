package com.foodbridge.email.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.foodbridge.email.service.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(String to, String name, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);

        message.setSubject("FoodBridge Password Reset OTP");

        String body = """
                Hello %s,

                You requested to reset your FoodBridge account password.

                Your One-Time Password (OTP) is:

                %s

                This OTP is valid for 10 minutes.

                If you did not request a password reset, please ignore this email.

                Regards,
                FoodBridge Team
                """.formatted(name, otp);

        message.setText(body);

        mailSender.send(message);
    }
}