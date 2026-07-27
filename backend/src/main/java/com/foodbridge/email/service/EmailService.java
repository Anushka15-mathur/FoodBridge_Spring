package com.foodbridge.email.service;

public interface EmailService {

    void sendOtpEmail(String to, String name, String otp);

}