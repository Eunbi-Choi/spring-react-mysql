package com.hansung.board_back.service;

import com.hansung.board_back.dto.request.auth.SignUpRequestDto;
import com.hansung.board_back.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
