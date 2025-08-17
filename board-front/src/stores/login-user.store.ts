
import { User } from "types/interface";
import { create } from "zustand";

interface LoginUserStore {
    loginUser: User | null; // 현재 로그인한 사용자의 정보를 담음
    setLoginUser: (loginuser: User) => void; // 로그인 성공 시 User 객체를 전달받아 loginUser에 저장
    resetLoginUser: () => void; // 로그아웃 시 loginUser를 null로 초기화.
};

const useLoginUserStore = create<LoginUserStore>(set => ({
    // create<LoginUserStore>: zustand의 create 함수를 이용해 LoginUserStore 타입의 전역 상태 생성
    // set: 상태를 변경하는 함수
    loginUser: null,
    setLoginUser: loginUser => set(state => ({...state, loginUser})),
    resetLoginUser: () => set(state => ({...state, loginUser: null}))
}));

export default useLoginUserStore;