package com.taskboardbackend.taskboardbackend.controller;

import com.taskboardbackend.taskboardbackend.dto.request.ColumnRequest;
import com.taskboardbackend.taskboardbackend.dto.response.ColumnResponse;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.service.ColumnsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/columns")
public class ColumnController {

    private final ColumnsService columnsService;

    @GetMapping
    public ResponseEntity<List<ColumnResponse>> getAll(UUID bordId) {
        return ResponseEntity.ok(columnsService.getAllColumns(bordId));
    }

    @PostMapping
    public ResponseEntity<ColumnResponse> createColumn(@Valid @RequestBody ColumnRequest columnRequest) {
        return ResponseEntity.ok(columnsService.createColumn(columnRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColumn(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        columnsService.deleteColumn(id, user);
        return ResponseEntity.ok().build();
    }


}
