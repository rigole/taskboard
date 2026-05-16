package com.taskboardbackend.taskboardbackend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class TaskResponse {
    private UUID id;
    private String title;
    private String description;
    private String priority;
    private LocalDateTime dueDate;
    private Integer position;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
