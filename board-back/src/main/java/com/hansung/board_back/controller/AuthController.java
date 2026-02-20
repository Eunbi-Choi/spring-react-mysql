package com.hansung.board_back.controller;

import com.hansung.board_back.dto.request.auth.SignInRequestDto;
import com.hansung.board_back.dto.request.auth.SignInResponseDto;
import com.hansung.board_back.dto.request.auth.SignUpRequestDto;
import com.hansung.board_back.dto.response.auth.SignUpResponseDto;
import com.hansung.board_back.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // ? super SignUpResponseDto 자바 제네릭 와일드카드 문법
    // SignInResponseDto 또는 그 부모 타입을 허용
    // Spring에서 이런 패턴은 성공 / 실패 응답을 공통 타입으로 처리하려고 사용
    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
            @RequestBody @Valid SignUpRequestDto requestBody) {
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(
            @RequestBody @Valid SignInRequestDto requestBody
    ) {
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    }

}