package com.foodbridge.admin.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.foodbridge.admin.mapper.AdminMapper;
import com.foodbridge.email.service.EmailService;
import com.foodbridge.donor.repository.DonorRepository;
import com.foodbridge.ngo.repository.NgoRepository;
import com.foodbridge.restaurant.repository.RestaurantRepository;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.enums.Role;
import com.foodbridge.user.repository.UserRepository;
import com.foodbridge.volunteer.entity.Volunteer;
import com.foodbridge.volunteer.repository.VolunteerRepository;

@ExtendWith(MockitoExtension.class)
class AdminServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private AdminMapper adminMapper;
    @Mock
    private RestaurantRepository restaurantRepository;
    @Mock
    private NgoRepository ngoRepository;
    @Mock
    private VolunteerRepository volunteerRepository;
    @Mock
    private DonorRepository donorRepository;
    @Mock
    private EmailService emailService;

    @InjectMocks
    private AdminServiceImpl adminService;

    @Test
    void approveVolunteerVerifiesAndSavesItsProfileOnce() {
        User user = userWithRole(Role.VOLUNTEER);
        Volunteer volunteer = Volunteer.builder().user(user).available(false).verified(false).build();
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(volunteerRepository.findByUser(user)).thenReturn(Optional.of(volunteer));

        adminService.approveUser(1L);

        assertEquals(AccountStatus.APPROVED, user.getStatus());
        assertEquals(Boolean.TRUE, volunteer.getVerified());
        assertEquals(Boolean.FALSE, volunteer.getAvailable());
        verify(volunteerRepository).save(volunteer);
        verify(userRepository).save(user);
    }

    @Test
    void approveNonVolunteerDoesNotTouchVolunteerProfiles() {
        User user = userWithRole(Role.NGO);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        adminService.approveUser(1L);

        assertEquals(AccountStatus.APPROVED, user.getStatus());
        verify(userRepository).save(user);
        verifyNoInteractions(volunteerRepository);
    }

    private User userWithRole(Role role) {
        User user = new User();
        user.setRole(role);
        user.setEmail("user@example.com");
        user.setFirstName("Test");
        return user;
    }
}
