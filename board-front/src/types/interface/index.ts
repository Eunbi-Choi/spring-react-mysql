import User from './user.interface';
import BoardListItem from './board-list-item.interface';
import CommentListItem from './comment-list-item.interface';
import favoriteListItem from './favorite-list-item.interface';

// 여러 타입 파일을 한 군데로 모아 관리하는 “타입 모음집” 역할
export type {
    User,
    BoardListItem,
    CommentListItem,
    favoriteListItem
}