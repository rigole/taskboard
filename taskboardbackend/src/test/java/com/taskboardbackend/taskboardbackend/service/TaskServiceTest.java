package com.taskboardbackend.taskboardbackend.service;

import com.taskboardbackend.taskboardbackend.dto.response.TaskResponse;
import com.taskboardbackend.taskboardbackend.dto.request.TaskRequest;
import com.taskboardbackend.taskboardbackend.model.Columns;
import com.taskboardbackend.taskboardbackend.model.Task;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.repository.ColumnRepository;
import com.taskboardbackend.taskboardbackend.repository.TaskRepository;
import com.taskboardbackend.taskboardbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
@DisplayName("Task Unit Tests")
@MockitoSettings(strictness = Strictness.LENIENT)
public class TaskServiceTest {
    @Mock
    private TaskRepository taskRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ColumnRepository columnRepository;
    @Mock
    private SecurityContext securityContext;
    @Mock
    private Authentication authentication;

    @Mock
    private TaskRequest mockTaskRequest;

    @Mock
    private TaskRequest updateRequest;

    @InjectMocks
    private TaskService taskService;

    private User mockCreator;
    private User mockAssignee;
    private Columns mockColumn;
    private Task mockTask;


    @BeforeEach
    void setUp() {

        mockCreator = User.builder()
                .id(UUID.randomUUID())
                .email("test@test.com")
                .password("password")
                .fullName("test creator")
                .role("USER")
                .build();
        mockAssignee = User.builder()
                .id(UUID.randomUUID())
                .email("test@test.com")
                .fullName("test assignee")
                .password("password")
                .role("USER")
                .build();

        mockColumn = Columns.builder()
                .id(UUID.randomUUID())
                .name("Test Column")
                .position(1)
                .build();

        mockTask = Task.builder()
                .id(UUID.randomUUID())
                .title("Write Unit test")
                .description("Details here")
                .priority("HIGH")
                .position(0)
                .createdBy(mockCreator)
                .assigneeUser(mockAssignee)
                .column(mockColumn)
                .createdAt(LocalDateTime.now())
                .build();

        mockTaskRequest.setTitle("Write Unit test");
        mockTaskRequest.setDescription("Details here");
        mockTaskRequest.setPriority("HIGH");
        mockTaskRequest.setColumn(mockColumn.getId());
        mockTaskRequest.setDueDate(LocalDateTime.now().plusWeeks(1));
        mockTaskRequest.setUpdatedAt(LocalDateTime.now());
        mockTaskRequest.setAssignee("test assignee");
        //mockColumn.getTasks().add(mockTask);

        updateRequest.setTitle("Updated title");
        updateRequest.setDescription("Updated desc");
        updateRequest.setPriority("LOW");
        updateRequest.setAssignee("test assignee");
        updateRequest.setColumn(mockColumn.getId());
        updateRequest.setUpdatedAt(LocalDateTime.now());
    }

    private void mockSecurityContext(String email) {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(email);
    }

    @Test
    @DisplayName("Returns Tasks of a user")
    void shouldGetTasksByAssignee() {
        when(taskRepository.findByAssigneeUserFullNameIgnoreCase("test assignee"))
                .thenReturn(List.of(mockTask));
        List<TaskResponse> result = taskService.getTasksByAssignee("test assignee");
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("Write Unit test");
        assertThat(result.get(0).getDescription()).isEqualTo("Details here");
        assertThat(result.get(0).getAssignee()).isEqualTo("test assignee");
    }

    @Test
    @DisplayName("Returns empty list when no taks found")
    void shouldReturnsEmptyListWhenNoTasks() {
        when(taskRepository.findByAssigneeUserFullNameIgnoreCase("No user"))
                .thenReturn(Collections.emptyList());

        List<TaskResponse> result = taskService.getTasksByAssignee("No user");
        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("returns tasks created by the given")
    void shouldReturnsTasksForCreator() {
        when(taskRepository.findByCreatedByFullNameIgnoreCase("test creator"))
                .thenReturn(List.of(mockTask));

        List<TaskResponse> result = taskService.getTasksByCreator("test creator");
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("Write Unit test");
        assertThat(result.get(0).getCreatedBy()).isEqualTo("test creator");
    }

    @Test
    @DisplayName("Create and returns the created Task")
    void shouldCreateTaskSuccessFull() {
        mockSecurityContext("test@test.com");
        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(mockCreator));
        when(userRepository.findByFullNameEqualsIgnoreCase("test assignee")).thenReturn(Optional.of(mockAssignee));
        when(columnRepository.findById(mockColumn.getId())).thenReturn(Optional.of(mockColumn));
        when(taskRepository.save(mockTask)).thenReturn(mockTask);
    }

    @Test
    @DisplayName("Throws Error when column is not found")
    void shouldThrowsWhenColumnNotFound() {
        mockSecurityContext("test@test.com");
        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(mockCreator));
        when(userRepository.findByFullNameEqualsIgnoreCase("test assignee")).thenReturn(Optional.empty());
        when(columnRepository.findById(mockColumn.getId())).thenReturn(Optional.empty());
        assertThatThrownBy(() -> taskService.createTask(mockTaskRequest)).isInstanceOf(RuntimeException.class);
    }

    @Test
    @DisplayName("Throw user is not the creator")
    void shouldThrowsErrorWhenUserNotAuthorized() {
        when(taskRepository.findById(mockTask.getId())).thenReturn(Optional.of(mockTask));
        assertThatThrownBy(() -> taskService.getTaskById(mockTask.getId(), mockAssignee))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    @DisplayName("Throws error when Error not found")
    void shouldThrowsWhenTaskNotFound() {
        when(taskRepository.findById(mockTask.getId())).thenReturn(Optional.of(mockTask));
        assertThatThrownBy(() -> taskService.updateTask(mockTask.getId(), updateRequest, mockCreator))
                .isInstanceOf(RuntimeException.class);

    }


}
