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
        String subject = "FoodBridge Password Reset OTP";
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

        sendEmail(to, subject, body);
    }

    @Override
    public void sendApprovalEmail(String to, String name) {
        String subject = "FoodBridge Registration Approved";
        String body = """
                Hello %s,

                Congratulations!

                Your FoodBridge account has been approved.

                You can now login and start using FoodBridge.

                Thank you for joining our community.

                Regards,
                FoodBridge Team
                """.formatted(name);

        sendEmail(to, subject, body);
    }

    @Override
    public void sendRejectionEmail(String to, String name) {
        String subject = "FoodBridge Registration Update";
        String body = """
                Hello %s,

                Thank you for registering with FoodBridge.

                Unfortunately, your registration could not be approved.

                Please review your submitted information and register again if required.

                Regards,
                FoodBridge Team
                """.formatted(name);

        sendEmail(to, subject, body);
    }

    @Override
    public void sendSuspensionEmail(String to, String name) {
        String subject = "FoodBridge Account Suspended";
        String body = """
                Hello %s,

                Your FoodBridge account has been suspended.

                If you believe this action was taken in error,
                please contact the administrator.

                Regards,
                FoodBridge Team
                """.formatted(name);

        sendEmail(to, subject, body);
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}