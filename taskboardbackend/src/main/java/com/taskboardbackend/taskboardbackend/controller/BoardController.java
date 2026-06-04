package com.taskboardbackend.taskboardbackend.controller;

import com.taskboardbackend.taskboardbackend.dto.request.BoardRequest;
import com.taskboardbackend.taskboardbackend.dto.response.BoardResponse;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<BoardResponse> createBoard(@Valid @RequestBody BoardRequest boardRequest) {
        return ResponseEntity.ok(boardService.createBoard(boardRequest));
    }

    @GetMapping
    public ResponseEntity<List<BoardResponse>> getAllBoards(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(boardService.getAllBoards(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        boardService.deleteBoard(id, user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardResponse> updateBoard(@PathVariable UUID id,
                                                     @RequestBody BoardRequest boardRequest,
                                                     @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(boardService.updateBoard(id, boardRequest, user));

    }
}
