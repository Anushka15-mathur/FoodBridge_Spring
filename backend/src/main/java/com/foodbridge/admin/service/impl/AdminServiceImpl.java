package com.foodbridge.admin.service.impl;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.foodbridge.admin.dto.AdminUserDetailsResponse;
import com.foodbridge.admin.dto.AdminUserSummaryResponse;
import com.foodbridge.admin.dto.DashboardResponse;
import com.foodbridge.admin.mapper.AdminMapper;
import com.foodbridge.admin.service.AdminService;
import com.foodbridge.common.dto.PageResponse;
import com.foodbridge.common.util.PageResponseUtil;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.enums.Role;
import com.foodbridge.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final UserRepository userRepository;

	private final AdminMapper adminMapper;

	@Override
	public PageResponse<AdminUserSummaryResponse> getAllUsers(
			int page,
			int size,
			String sortBy,
			String direction) {

		Sort sort = direction.equalsIgnoreCase("desc")
				? Sort.by(sortBy).descending()
				: Sort.by(sortBy).ascending();

		Pageable pageable = PageRequest.of(page, size, sort);

		Page<User> userPage = userRepository.findAll(pageable);

		return PageResponseUtil.toPageResponse(
				userPage,
				adminMapper.toSummaryResponseList(userPage.getContent()));
	}

	@Override
	public AdminUserDetailsResponse getUserById(Long id) {

		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(
						"User not found with id : " + id));

		return adminMapper.toDetailsResponse(user);
	}

	@Override
	public PageResponse<AdminUserSummaryResponse> getPendingUsers(
			int page,
			int size,
			String sortBy,
			String direction) {

		Sort sort = direction.equalsIgnoreCase("desc")
				? Sort.by(sortBy).descending()
				: Sort.by(sortBy).ascending();

		Pageable pageable = PageRequest.of(page, size, sort);

		Page<User> userPage = userRepository.findByStatus(AccountStatus.PENDING, pageable);

		return PageResponseUtil.toPageResponse(
				userPage,
				adminMapper.toSummaryResponseList(userPage.getContent()));
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

	@Override
	public DashboardResponse getDashboard() {

		return DashboardResponse.builder()

				.totalUsers(userRepository.count())

				.pendingUsers(userRepository.countByStatus(AccountStatus.PENDING))

				.approvedUsers(userRepository.countByStatus(AccountStatus.APPROVED))

				.rejectedUsers(userRepository.countByStatus(AccountStatus.REJECTED))

				.suspendedUsers(userRepository.countByStatus(AccountStatus.SUSPENDED))

				.totalAdmins(userRepository.countByRole(Role.ADMIN))

				.totalRestaurants(userRepository.countByRole(Role.RESTAURANT))

				.totalNGOs(userRepository.countByRole(Role.NGO))

				.totalDonors(userRepository.countByRole(Role.DONOR))

				.totalVolunteers(userRepository.countByRole(Role.VOLUNTEER))

				.build();
	}

	@Override
	public PageResponse<AdminUserSummaryResponse> searchUsers(
			String keyword,
			int page,
			int size) {

		Pageable pageable = PageRequest.of(page, size);

		Page<User> userPage = userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
				keyword,
				keyword,
				pageable);

		return PageResponseUtil.toPageResponse(
				userPage,
				adminMapper.toSummaryResponseList(userPage.getContent()));
	}

	@Override
	public PageResponse<AdminUserSummaryResponse> filterUsersByRole(
			Role role,
			int page,
			int size) {

		Pageable pageable = PageRequest.of(page, size);

		Page<User> userPage = userRepository.findByRole(role, pageable);

		return PageResponseUtil.toPageResponse(
				userPage,
				adminMapper.toSummaryResponseList(userPage.getContent()));
	}

	@Override
	public PageResponse<AdminUserSummaryResponse> filterUsersByStatus(
			AccountStatus status,
			int page,
			int size) {

		Pageable pageable = PageRequest.of(page, size);

		Page<User> userPage = userRepository.findByStatus(status, pageable);

		return PageResponseUtil.toPageResponse(
				userPage,
				adminMapper.toSummaryResponseList(userPage.getContent()));
	}

	private void updateUserStatus(Long id, AccountStatus status) {

		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(
						"User not found with id: " + id));

		user.setStatus(status);

		userRepository.save(user);
	}

	@Override
	public PageResponse<AdminUserSummaryResponse> filterUsers(

			String keyword,

			Role role,

			AccountStatus status,

			int page,

			int size) {

		Pageable pageable = PageRequest.of(page, size);

		// Treat empty string as null
		if (keyword != null && keyword.isBlank()) {
			keyword = null;
		}

		Page<User> userPage = userRepository.filterUsers(
				keyword,
				role,
				status,
				pageable);

		return PageResponseUtil.toPageResponse(
				userPage,
				adminMapper.toSummaryResponseList(userPage.getContent()));
	}

}