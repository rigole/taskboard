package com.taskboardbackend.taskboardbackend.service;


import com.taskboardbackend.taskboardbackend.dto.request.TaskRequest;
import com.taskboardbackend.taskboardbackend.dto.response.TaskResponse;
import com.taskboardbackend.taskboardbackend.model.Columns;
import com.taskboardbackend.taskboardbackend.model.Task;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.repository.ColumnRepository;
import com.taskboardbackend.taskboardbackend.repository.TaskRepository;
import com.taskboardbackend.taskboardbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ColumnRepository columnRepository;

    public List<TaskResponse> getTasksByAssignee(String assignee) {

        return taskRepository.findByAssigneeUserFullNameIgnoreCase(assignee).
                stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<TaskResponse> getTasksByCreator(String createdBy) {
        return taskRepository.findByCreatedByFullNameIgnoreCase(createdBy)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TaskResponse createTask(TaskRequest taskRequest) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User taskCreatorEmail = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User taskAssignee = userRepository
                .findByFullNameEqualsIgnoreCase(taskRequest.getAssignee())
                .orElseThrow(() -> new RuntimeException("Assignee not found"));
        Columns columnTask = columnRepository.findByNameEqualsIgnoreCase(taskRequest.getColumn())
                .orElseThrow(() -> new RuntimeException("Column not found"));


        Task task = Task.builder()
                .createdBy(taskCreatorEmail)
                .description(taskRequest.getDescription())
                .priority(taskRequest.getPriority())
                .title(taskRequest.getTitle())
                .assigneeUser(taskAssignee)
                .dueDate(taskRequest.getDueDate())
                .position(taskRequest.getPosition())
                .column(columnTask)
                .updatedAt(taskRequest.getUpdatedAt())
                .build();

        return mapToResponse(taskRepository.save(task));

    }

    @Transactional
    public TaskResponse updateTask(UUID taskId, TaskRequest taskRequest, User user) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("User not authorized");
        }


        if (taskRequest.getColumn() != null) {
            Columns columnTask = columnRepository.findByNameEqualsIgnoreCase(taskRequest.getColumn())
                    .orElseThrow(() -> new RuntimeException("Column not found"));
            task.setColumn(columnTask);
        }

        if (taskRequest.getAssignee() != null) {
            User taskAssignee = userRepository
                    .findByFullNameEqualsIgnoreCase(taskRequest.getAssignee())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssigneeUser(taskAssignee);
        }


        task.setDescription(taskRequest.getDescription());
        task.setTitle(taskRequest.getTitle());
        task.setPriority(taskRequest.getPriority());
        task.setTitle(taskRequest.getTitle());
        task.setUpdatedAt(taskRequest.getUpdatedAt());
        task.setPosition(taskRequest.getPosition());
        Task taskUpdated = taskRepository.saveAndFlush(task);
        return mapToResponse(taskUpdated);

    }

    public void deleteTask(UUID taskId, User user) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("User not authorized");
        }
        taskRepository.delete(task);
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .description(task.getDescription())
                .createdAt(task.getCreatedAt())
                .createdBy(task.getCreatedBy().getFullName())
                .title(task.getTitle())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .position(task.getPosition())
                .assignee(task.getAssigneeUser().getFullName())
                .updatedAt(task.getUpdatedAt())
                .build();


    }
}
