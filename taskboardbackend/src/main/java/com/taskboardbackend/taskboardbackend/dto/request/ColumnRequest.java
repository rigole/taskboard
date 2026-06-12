package com.taskboardbackend.taskboardbackend.dto.request;


import com.taskboardbackend.taskboardbackend.dto.response.TaskResponse;
import com.taskboardbackend.taskboardbackend.model.Board;
import com.taskboardbackend.taskboardbackend.model.Task;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnRequest {

    private Integer position;

    @NotNull(message = "Name is required")
    private String name;
    private LocalDateTime updatedAt;
    private UUID boardId;
    private List<TaskResponse> tasks;

}
