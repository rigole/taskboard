package com.taskboardbackend.taskboardbackend.service;

import com.taskboardbackend.taskboardbackend.dto.request.BoardRequest;
import com.taskboardbackend.taskboardbackend.dto.request.ColumnRequest;
import com.taskboardbackend.taskboardbackend.dto.response.ColumnResponse;
import com.taskboardbackend.taskboardbackend.model.Board;
import com.taskboardbackend.taskboardbackend.model.Columns;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.repository.BoardRepository;
import com.taskboardbackend.taskboardbackend.repository.ColumnRepository;
import com.taskboardbackend.taskboardbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
@DisplayName("Column Unit Tests")
@MockitoSettings(strictness = Strictness.LENIENT)
public class ColumnServiceTest {
    @InjectMocks
    private BoardService boardService;
    @InjectMocks
    private ColumnsService columnsService;
    @Mock
    private BoardRepository boardRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ColumnRepository columnRepository;


    private Board mockBoard;
    private Columns mockColumn;
    private User mockUser;
    private BoardRequest mockBoardRequest;
    private ColumnRequest mockColumnRequest;

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

        mockColumn = Columns.builder()
                .id(UUID.randomUUID())
                .name("Test Column")
                .position(1)
                .board(mockBoard)
                .build();

        mockColumnRequest = new ColumnRequest();
        mockColumnRequest.setName("Test Board");
        mockColumnRequest.setPosition(1);
        mockColumnRequest.setBoardId(mockBoard.getId());
    }

    @Test
    @DisplayName("Should return all Columns for a board")
    void shouldGetAllColumnsForBoard() {
        UUID boardId = mockBoard.getId();
        when(columnRepository.findByBoardId(boardId)).thenReturn(List.of(mockColumn));
        List<ColumnResponse> result = columnsService.getAllColumns(boardId);


        assertThat(result.get(0).getId()).isEqualTo(mockColumn.getId());
        assertThat(result.get(0).getName()).isEqualTo("Test Column");
        assertThat(result.get(0).getPosition()).isEqualTo(1);
        assertThat(result.get(0).getTasks().isEmpty()).isTrue();
        verify(columnRepository).findByBoardId(boardId);
    }

    @Test
    @DisplayName("Should Empty list when no column found")
    void shouldReturnEmptyListWhenNoColumnsFound() {
        UUID boardId = mockBoard.getId();
        when(columnRepository.findByBoardId(boardId)).thenReturn(Collections.emptyList());
        List<ColumnResponse> result = columnsService.getAllColumns(boardId);
        assertThat(result.isEmpty()).isTrue();
    }

    @Test
    @DisplayName("Should create Column")
    void shouldCreateColumn() {
        when(boardRepository.findById(mockBoard.getId())).thenReturn(Optional.of(mockBoard));
        when(columnRepository.save(any(Columns.class))).thenReturn(mockColumn);

        ColumnResponse response = columnsService.createColumn(mockColumnRequest);
        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("Test Column");
        assertThat(response.getPosition()).isEqualTo(1);

        ArgumentCaptor<Columns> captor = ArgumentCaptor.forClass(Columns.class);
        verify(columnRepository).save(captor.capture());
        assertThat(captor.getValue().getBoard()).isEqualTo(mockBoard);
    }

    @Test
    @DisplayName("Should throw exception no Board")
    void shouldThrowExceptionWhenCreatingColumnOnMissingBoard() {
        when(boardRepository.findById(mockBoard.getId())).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> columnsService.createColumn(mockColumnRequest));
        verify(columnRepository, never()).save(any(Columns.class));
    }

    @Test
    @DisplayName("Should Update Column")
    void shouldUpdateColumn() {
        UUID columnId = mockColumn.getId();
        mockColumnRequest.setName("In Progress");
        mockColumnRequest.setPosition(2);

        when(columnRepository.findById(columnId)).thenReturn(Optional.of(mockColumn));
        when(boardRepository.findById(mockColumnRequest.getBoardId())).thenReturn(Optional.of(mockBoard));
        when(columnRepository.save(any(Columns.class))).thenReturn(mockColumn);

        ColumnResponse response = columnsService.updateColumn(columnId, mockColumnRequest, mockUser);
        assertThat(response).isNotNull();
        assertThat(mockColumn.getName()).isEqualTo("In Progress");
        assertThat(mockColumn.getPosition()).isEqualTo(2);
        assertThat(mockColumn.getBoard()).isEqualTo(mockBoard);

        verify(columnRepository).save(mockColumn);
    }
}
