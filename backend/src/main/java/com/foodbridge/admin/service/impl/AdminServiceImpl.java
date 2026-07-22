package com.foodbridge.admin.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.foodbridge.admin.dto.AdminUserDetailsResponse;
import com.foodbridge.admin.dto.AdminUserSummaryResponse;
import com.foodbridge.admin.mapper.AdminMapper;
import com.foodbridge.admin.service.AdminService;
import com.foodbridge.common.dto.PageResponse;
import com.foodbridge.common.util.PageResponseUtil;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final UserRepository userRepository;
	
	private final AdminMapper adminMapper;
	
	@Override
	public PageResponse<AdminUserSummaryResponse> getAllUsers(int page, int size) {

	    Pageable pageable = PageRequest.of(page, size);

	    Page<User> userPage = userRepository.findAll(pageable);

	    return PageResponseUtil.toPageResponse(
	            userPage,
	            adminMapper.toSummaryResponseList(userPage.getContent())
	    );
	}

	@Override
	public AdminUserDetailsResponse getUserById(Long id) {

	    User user = userRepository.findById(id)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "User not found with id : " + id));

	    return adminMapper.toDetailsResponse(user);
	}

	@Override
	public PageResponse<AdminUserSummaryResponse> getPendingUsers(int page, int size) {

	    Pageable pageable = PageRequest.of(page, size);

	    Page<User> userPage =
	            userRepository.findByStatus(AccountStatus.PENDING, pageable);

	    return PageResponseUtil.toPageResponse(
	            userPage,
	            adminMapper.toSummaryResponseList(userPage.getContent())
	    );
	}
	
	private void updateUserStatus(Long id, AccountStatus status) {

	    User user = userRepository.findById(id)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "User not found with id: " + id));

	    user.setStatus(status);

	    userRepository.save(user);
	}
	
	@Override
	public void approveUser(Long id) {
	    updateUserStatus(id, AccountStatus.APPROVED);
	}

	@Override
	public void rejectUser(Long id) {
	    updateUserStatus(id, AccountStatus.REJECTED);
	}

	@Override
	public void suspendUser(Long id) {
	    updateUserStatus(id, AccountStatus.SUSPENDED);
	}
}