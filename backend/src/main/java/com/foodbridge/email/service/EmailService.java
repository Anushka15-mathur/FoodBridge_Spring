package com.foodbridge.email.service;

public interface EmailService {

    void sendOtpEmail(String to, String name, String otp);

    void sendApprovalEmail(String to, String name);

    void sendRejectionEmail(String to, String name);

    void sendSuspensionEmail(String to, String name);

}