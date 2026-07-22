package com.foodbridge.admin.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.foodbridge.admin.dto.AdminUserDetailsResponse;
import com.foodbridge.admin.dto.AdminUserSummaryResponse;
import com.foodbridge.admin.mapper.AdminMapper;
import com.foodbridge.admin.service.AdminService;
import com.foodbridge.common.dto.PageResponse;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final UserRepository userRepository;
	
	private final AdminMapper adminMapper;
	
	@Override
	public PageResponse<AdminUserSummaryResponse> getAllUsers(int page, int size) {
	    return null;
	}

	@Override
	public AdminUserDetailsResponse getUserById(Long id) {
	    return null;
	}

	@Override
	public PageResponse<AdminUserSummaryResponse> getPendingUsers(int page, int size) {
	    return null;
	}

	@Override
	public void approveUser(Long id) {

	}

	@Override
	public void rejectUser(Long id) {

	}

	@Override
	public void suspendUser(Long id) {

	}
}