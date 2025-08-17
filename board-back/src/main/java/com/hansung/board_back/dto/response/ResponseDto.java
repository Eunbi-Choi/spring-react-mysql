package com.hansung.board_back.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hansung.board_back.common.ResponseCode;
import com.hansung.board_back.common.ResponseMessage;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDto {

    private String code;
    private String message;

    // ResponseEntity → HTTP 응답을 담는 컨테이너(HTTP 상태 코드, 응답 헤더, 응답 바디)
    // <ResponseDto> → 응답 바디의 데이터 타입을 ResponseDto로 지정한 것
    public static ResponseEntity<ResponseDto> databaseError() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
    
}
