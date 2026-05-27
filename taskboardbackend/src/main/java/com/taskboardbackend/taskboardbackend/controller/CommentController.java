package com.taskboardbackend.taskboardbackend.controller;

import com.taskboardbackend.taskboardbackend.dto.request.CommentsRequest;
import com.taskboardbackend.taskboardbackend.dto.response.CommentsResponse;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/{id}")
    public ResponseEntity<List<CommentsResponse>> getAllTaskComments(@PathVariable UUID id) {
        return ResponseEntity.ok(commentService.getAllTaskComments(id));
    }

    @PostMapping
    public ResponseEntity<CommentsResponse> updateComment(@RequestBody CommentsRequest requestComment) {
        return ResponseEntity.ok(commentService.createComment(requestComment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentsResponse> updateComment(@PathVariable UUID id,
                                                          @Valid @RequestBody CommentsRequest requestComment,
                                                          @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(commentService.updateComment(id, requestComment, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        commentService.deleteComment(id, user);
        return ResponseEntity.noContent().build();
    }
}
