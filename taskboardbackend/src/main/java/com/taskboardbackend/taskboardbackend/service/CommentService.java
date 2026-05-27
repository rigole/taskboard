package com.taskboardbackend.taskboardbackend.service;

import com.taskboardbackend.taskboardbackend.dto.request.CommentsRequest;
import com.taskboardbackend.taskboardbackend.dto.response.CommentsResponse;
import com.taskboardbackend.taskboardbackend.model.Comment;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.repository.CommentRepository;
import com.taskboardbackend.taskboardbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
@RequiredArgsConstructor
public class CommentService {
    private CommentRepository commentRepository;
    private UserRepository userRepository;


    public List<CommentsResponse> getAllTaskComments(UUID taskId) {
        return commentRepository.findAllByTaskIdOrderByCreatedAtDesc(taskId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CommentsResponse createComment(CommentsRequest commentsRequest) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = Comment.builder()
                .user(user)
                .content(commentsRequest.getContent())
                .updatedAt(commentsRequest.getUpdatedAt())
                .build();

        return mapToResponse(commentRepository.save(comment));
    }

    public CommentsResponse updateComment(UUID commentId, CommentsRequest commentsRequest, User user) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("User not the same user");
        }
        comment.setContent(commentsRequest.getContent());
        comment.setUpdatedAt(commentsRequest.getUpdatedAt());
        return mapToResponse(commentRepository.save(comment));
    }

    public void deleteComment(UUID commentId, User user) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorised user");
        }
        commentRepository.delete(comment);
    }

    private CommentsResponse mapToResponse(Comment comment) {
        return CommentsResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .taskId(comment.getTask().getId())
                .userId(comment.getUser().getId())
                .build();
    }

}
