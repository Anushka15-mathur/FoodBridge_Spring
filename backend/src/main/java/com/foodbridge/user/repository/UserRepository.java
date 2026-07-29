package com.foodbridge.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.enums.Role;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends JpaRepository<User, Long> {

        Optional<User> findByEmail(String email);

        List<User> findByStatus(AccountStatus status);

        boolean existsByEmail(String email);

        boolean existsByPhone(String phone);

        Page<User> findByStatus(AccountStatus status, Pageable pageable);

        long countByStatus(AccountStatus status);

        long countByRole(Role role);

        long count();

        Page<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                        String firstName,
                        String lastName,
                        Pageable pageable);

        Page<User> findByRole(
                        Role role,
                        Pageable pageable);

        @Query("""
                        SELECT u
                        FROM User u
                        WHERE
                            (:keyword IS NULL OR
                                LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
                                OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
                                OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
                                OR u.phone LIKE CONCAT('%', :keyword, '%'))
                        AND
                            (:role IS NULL OR u.role = :role)
                        AND
                            (:status IS NULL OR u.status = :status)
                        """)
        Page<User> filterUsers(

                        @Param("keyword") String keyword,

                        @Param("role") Role role,

                        @Param("status") AccountStatus status,

                        Pageable pageable);

}