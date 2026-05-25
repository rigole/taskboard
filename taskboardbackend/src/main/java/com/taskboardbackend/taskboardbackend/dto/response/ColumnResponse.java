package com.taskboardbackend.taskboardbackend.dto.response;


import com.taskboardbackend.taskboardbackend.model.Board;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ColumnResponse {
    private UUID id;
    private String name;
    private Integer position;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
