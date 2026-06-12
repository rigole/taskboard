package com.taskboardbackend.taskboardbackend.service;

import com.taskboardbackend.taskboardbackend.dto.request.ColumnRequest;
import com.taskboardbackend.taskboardbackend.model.Board;
import com.taskboardbackend.taskboardbackend.model.Columns;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.repository.BoardRepository;
import com.taskboardbackend.taskboardbackend.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.UUID;

@ExtendWith(MockitoExtension.class)
@DisplayName("Column Unit Tests")
@MockitoSettings(strictness = Strictness.LENIENT)
public class ColumnServiceTest {
    @InjectMocks
    private ColumnsService columnsService;
    @Mock
    private BoardService boardService;
    @Mock
    private BoardRepository boardRepository;
    @Mock
    private UserRepository userRepository;

    private ColumnRequest columnRequest;
    private Board mockBoard;
    private User mockUser;
    private Columns mockColumn;

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
                .description("Test description")
                .user(mockUser)
                .build();
        mockColumn = Columns.builder()
                .id(UUID.randomUUID())
                .name("Test Column")
                .board(mockBoard)
                .position(1)
                .build();
    }
}
