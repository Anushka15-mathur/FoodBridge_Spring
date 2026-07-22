package com.foodbridge.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodbridge.admin.dto.AdminUserDetailsResponse;
import com.foodbridge.admin.dto.AdminUserSummaryResponse;
import com.foodbridge.admin.service.AdminService;
import com.foodbridge.common.dto.PageResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public PageResponse<AdminUserSummaryResponse> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return adminService.getAllUsers(page, size);
    }

    @GetMapping("/users/pending")
    public PageResponse<AdminUserSummaryResponse> getPendingUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return adminService.getPendingUsers(page, size);
    }

    @GetMapping("/users/{id}")
    public AdminUserDetailsResponse getUserById(
            @PathVariable Long id) {

        return adminService.getUserById(id);
    }

    @PutMapping("/users/{id}/approve")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void approveUser(@PathVariable Long id) {
        adminService.approveUser(id);
    }

    @PutMapping("/users/{id}/reject")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void rejectUser(@PathVariable Long id) {
        adminService.rejectUser(id);
    }

    @PutMapping("/users/{id}/suspend")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void suspendUser(@PathVariable Long id) {
        adminService.suspendUser(id);
    }
}