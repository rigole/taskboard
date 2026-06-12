package com.taskboardbackend.taskboardbackend.service;


import com.taskboardbackend.taskboardbackend.dto.request.ColumnRequest;
import com.taskboardbackend.taskboardbackend.dto.response.BoardResponse;
import com.taskboardbackend.taskboardbackend.dto.response.ColumnResponse;
import com.taskboardbackend.taskboardbackend.dto.response.TaskResponse;
import com.taskboardbackend.taskboardbackend.model.Board;
import com.taskboardbackend.taskboardbackend.model.Columns;
import com.taskboardbackend.taskboardbackend.model.Task;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.repository.BoardRepository;
import com.taskboardbackend.taskboardbackend.repository.ColumnRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ColumnsService {

    private final ColumnRepository columnRepository;
    private final BoardRepository boardRepository;


    public List<ColumnResponse> getAllColumns(UUID boardId) {
        return columnRepository.findByBoardId(boardId).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public ColumnResponse createColumn(ColumnRequest columnRequest) {
        Board boardColumn = boardRepository.findById(columnRequest.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));
        Columns columns = Columns.builder()
                .name(columnRequest.getName())
                .board(boardColumn)
                .position(columnRequest.getPosition())
                .build();
        return mapToResponse(columnRepository.save(columns));
    }

    public ColumnResponse updateColumn(UUID columnId, ColumnRequest columnRequest, User user) {
        Columns columns = columnRepository.findById(columnId).orElseThrow(() -> new RuntimeException("Column not found"));
        if (!columns.getBoard().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        Board boardColumn = boardRepository.findById(columnRequest.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));
        columns.setName(columnRequest.getName());
        columns.setPosition(columnRequest.getPosition());
        columns.setBoard(boardColumn);
        return mapToResponse(columnRepository.save(columns));
    }

    public void deleteColumn(UUID columnId, User user) {
        Columns columns = columnRepository.findById(columnId).orElseThrow(() -> new RuntimeException("Column not found"));
        if (!columns.getBoard().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        columnRepository.deleteById(columnId);
    }


    private TaskResponse mapTaskToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .description(task.getDescription())
                .createdAt(task.getCreatedAt())
                .createdBy(task.getCreatedBy().getFullName())
                .title(task.getTitle())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .position(task.getPosition())
                .assignee(task.getAssigneeUser() != null
                        ? task.getAssigneeUser().getFullName()
                        : null

                )
                .updatedAt(task.getUpdatedAt())
                .build();


    }

    private ColumnResponse mapToResponse(Columns columns) {
        List<TaskResponse> tasks = columns.getTasks() == null
                ? Collections.emptyList()
                : columns.getTasks()
                .stream()
                .map(this::mapTaskToResponse)
                .collect(Collectors.toList());
        return ColumnResponse.builder()
                .id(columns.getId())
                .name(columns.getName())
                .tasks(tasks)
                .createdAt(columns.getCreatedAt())
                .updatedAt(columns.getUpdatedAt())
                .position(columns.getPosition())
                .build();
    }


}
