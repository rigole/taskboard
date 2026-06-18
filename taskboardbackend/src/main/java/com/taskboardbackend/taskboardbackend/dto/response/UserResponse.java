package com.taskboardbackend.taskboardbackend.dto.response;


import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserResponse {
    private String fullName;
    private UUID id;
    private String image;
    private String email;
    private String role;
}
