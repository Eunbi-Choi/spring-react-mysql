package com.hansung.board_back.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardListItem {
    private int boardNumber;
    private String title;
    private String content;
    private String boardTitleImage;
    private int favoriteCount;
    private int commentCount;
    private int viewCount;
    private String writeDatetime;
    private String writeNickname;
    private String writeProfileImage;
}


// Dto는 Data Transfer Object의 약자. 말 그대로 데이터를 전송하기 위한 객체를 의미한다.

// 주로 백엔드 → 프론트엔드, 또는 서비스 계층 → 컨트롤러 계층 사이에서 데이터를 옮길 때 사용됨

// 데이터만 담는다. 보통 getter/setter, 필드, 생성자 정도만 있고 복잡한 비즈니스 로직은 없다.
// 레이어 간 데이터 전달. 예: DB에서 가져온 Entity를 그대로 노출하지 않고, 필요한 데이터만 담아 Dto로 변환해서 반환.
// 보안과 안정성 Entity를 그대로 노출하면 민감한 정보(비밀번호 등)가 외부에 나갈 수 있는데, Dto는 필요한 필드만 담아서 안전하게 전송.