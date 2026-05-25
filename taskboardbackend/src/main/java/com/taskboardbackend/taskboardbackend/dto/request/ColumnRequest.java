package com.taskboardbackend.taskboardbackend.dto.request;


import com.taskboardbackend.taskboardbackend.model.Board;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColumnRequest {

    private Integer position;

    @NotNull(message = "Name is required")
    private String name;

    private UUID boardId;

}
