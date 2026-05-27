package com.taskboardbackend.taskboardbackend.dto.request;

import com.taskboardbackend.taskboardbackend.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {

    @NotNull(message = "Title is required")
    private String title;

    private String description;

    private String priority;

    private String assignee;

    private String createdBy;

    private LocalDateTime dueDate;

    private Integer position;
    private LocalDateTime updatedAt;
    private String column;
}
