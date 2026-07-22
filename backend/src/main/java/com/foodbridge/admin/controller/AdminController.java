package com.foodbridge.admin.controller;


import com.foodbridge.admin.dto.AdminUserDetailsResponse;
import com.foodbridge.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public Page<AdminUserDetailsResponse> getAllUsers(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return (Page<AdminUserDetailsResponse>) adminService.getAllUsers(page, size);
    }
}