package com.foodbridge.admin.mapper;

import com.foodbridge.admin.dto.AdminUserDetailsResponse;
import com.foodbridge.admin.dto.AdminUserSummaryResponse;
import com.foodbridge.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AdminMapper {

    @Mapping(target = "fullName",
            expression = "java(user.getFirstName() + \" \" + user.getLastName())")
    AdminUserSummaryResponse toSummaryResponse(User user);

    List<AdminUserSummaryResponse> toSummaryResponseList(List<User> users);

    AdminUserDetailsResponse toDetailsResponse(User user);

}