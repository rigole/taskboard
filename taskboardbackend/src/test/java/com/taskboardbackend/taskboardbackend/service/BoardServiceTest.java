package com.taskboardbackend.taskboardbackend.service;


import com.taskboardbackend.taskboardbackend.dto.request.BoardRequest;
import com.taskboardbackend.taskboardbackend.dto.response.BoardResponse;
import com.taskboardbackend.taskboardbackend.model.Board;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.repository.BoardRepository;
import com.taskboardbackend.taskboardbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ExtendWith(MockitoExtension.class)
@DisplayName("Board Unit Tests")
@MockitoSettings(strictness = Strictness.LENIENT)
public class BoardServiceTest {
    @InjectMocks
    private BoardService boardService;
    @Mock
    private BoardRepository boardRepository;
    @Mock
    private UserRepository userRepository;

    private Board mockBoard;
    private User mockUser;
    private BoardRequest mockBoardRequest;

    @BeforeEach
    void setUp() {
        mockUser = User.builder()
                .id(UUID.randomUUID())
                .email("test@test.com")
                .password("password")
                .role("USER")
                .build();
        mockBoard = Board.builder()
                .id(UUID.randomUUID())
                .name("Test Board")
                .user(mockUser)
                .description("Test description")
                .build();
        mockBoardRequest = new BoardRequest();
        mockBoardRequest.setName("Test Board");
        mockBoardRequest.setDescription("Test description");
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("test@test.com");
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    @DisplayName("Should Create Board Successfull")
    void shouldCreateBoard() {
        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(mockUser));
        when(boardRepository.save(any(Board.class))).thenReturn(mockBoard);

        BoardResponse response = boardService.createBoard(mockBoardRequest);
        assertNotNull(response);

        assertEquals("Test Board", response.getName());
        assertEquals("Test description", response.getDescription());

        verify(boardRepository, times(1)).save(any(Board.class));
    }

    @Test
    @DisplayName("Should return all Board for user")
    void shouldReturnAllBoardForUser() {
        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(mockUser));
        when(boardRepository.findAllByUserIdOrderByCreatedAtDesc(mockUser.getId())).thenReturn(List.of(mockBoard));

        List<BoardResponse> response = boardService.getAllBoards(mockUser);

        assertNotNull(response);
        assertEquals("Test Board", response.get(0).getName());
        assertEquals("Test description", response.get(0).getDescription());

        verify(boardRepository, times(1)).findAllByUserIdOrderByCreatedAtDesc(mockUser.getId());
    }

}
