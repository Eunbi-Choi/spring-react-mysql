// interface → TypeScript에서 객체의 구조(타입) 를 정의하는 키워드
// export default → 이 파일에서 기본으로 내보내는 값이 이 인터페이스라는 뜻.
// → 다른 파일에서 import BoardListItem from "./파일경로" 로 바로 가져올 수 있음.
export default interface BoardListItem {
    boardNumber: number;
    title: string;
    content: string;
    boardTitleImage: string | null;
    favoriteCount: number;
    commentCount: number;
    viewCount: number;
    writeDatetime: string;
    writerNickname: string;
    writerProfileImage: string | null;
}