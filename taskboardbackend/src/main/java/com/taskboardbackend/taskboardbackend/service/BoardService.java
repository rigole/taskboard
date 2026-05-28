package com.taskboardbackend.taskboardbackend.service;


import com.taskboardbackend.taskboardbackend.dto.request.BoardRequest;
import com.taskboardbackend.taskboardbackend.dto.response.BoardResponse;
import com.taskboardbackend.taskboardbackend.model.Board;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.repository.BoardRepository;
import com.taskboardbackend.taskboardbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    public List<BoardResponse> getAllBoards(User user) {
        return boardRepository.findAllByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public BoardResponse createBoard(BoardRequest boardRequest) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User boardUser = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Board board = Board.builder()
                .name(boardRequest.getName())
                .user(boardUser)
                .description(boardRequest.getDescription())
                .updatedAt(boardRequest.getUpdateDate())
                .build();

        return mapToResponse(boardRepository.save(board));
    }


    public BoardResponse updateBoard(UUID boardId, BoardRequest boardRequest, User user) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RuntimeException("Board not found"));
        if (!board.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("User not the same user");
        }
        board.setName(boardRequest.getName());
        board.setDescription(boardRequest.getDescription());
        board.setUpdatedAt(boardRequest.getUpdateDate());
        return mapToResponse(boardRepository.save(board));
    }

    public void deleteBoard(UUID id, User user) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        if (board.getUser().getId().equals(user.getId())) {
            boardRepository.delete(board);
        } else {
            throw new RuntimeException("User not allowed to delete");
        }

    }

    private BoardResponse mapToResponse(Board board) {
        return BoardResponse.builder()
                .id(board.getId())
                .name(board.getName())
                .createdAt(board.getCreatedAt())
                .description(board.getDescription())
                .updatedAt(board.getUpdatedAt())
                .build();
    }

}
