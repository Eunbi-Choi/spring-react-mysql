import { create } from "zustand";

interface BoardSrtore {
    title: string;
    content: string;
    boardImageFileList: File[];
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setImageFileList: (boardImageFileList: File[]) => void;
    resetBoard: () => void;
};

const useBoardStore = create<BoardSrtore>(set => ({
    title: '',
    content: '',
    boardImageFileList: [],
    setTitle: (title) => set(state => ({ ...state, title })),
    setContent: (content) => set(state => ({ ...state, content })),
    setImageFileList: (boardImageFileList) => set(state => ({ ...state, boardImageFileList })),
    resetBoard: () => set(state => ({ ...state, title: '', content: '', boardImageFileList: []})),
}));

export default useBoardStore;