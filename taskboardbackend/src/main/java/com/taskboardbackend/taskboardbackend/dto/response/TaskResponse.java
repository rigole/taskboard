package com.taskboardbackend.taskboardbackend.dto.response;

import com.taskboardbackend.taskboardbackend.model.User;
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
    private String assignee;
    private String createdBy;
    private LocalDateTime dueDate;
    private Integer position;
    private UUID column;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
