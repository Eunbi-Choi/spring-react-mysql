import { ChangeEvent, useState, useRef, KeyboardEvent, useEffect } from 'react';
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';

//          component: 헤더 레이아웃          //
export default function Header() {

  //          state: 로그인 유저 상태          //
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
  //          state: path 상태          //
  const { pathname } = useLocation();
  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();
  //          state: 로그인 상태          //
  const [isLogin, setLogin] = useState<boolean>(false);
  //          state: 인증 페이지 상태          //
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  //          state: 메인 페이지 상태          //
  const [isMainPage, setMainPage] = useState<boolean>(false);
  //          state: 검색 페이지 상태          //
  const [isSearchPage, setSearchPage] = useState<boolean>(false);
  //          state: 게시물 상세 페이지 상태          //
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  //          state: 게시물 작성 페이지 상태          //
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  //          state: 게시물 수정 페이지 상태          //
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
  //          state: 유저 페이지 상태          //
  const [isUserPage, setUserPage] = useState<boolean>(false);

  //          function: 네비게이트 함수          //
  const navigate = useNavigate(); // useNavigate - 페이지 이동

  //          event handler: 로고 클릭 이벤트 처리 함수          //
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }

  //          component: 검색 버튼 컴포넌트          //
  const SearchButton = () => {

    //          state: 검색어 버튼 요소 참조 상태          //
    const searchButtonRef = useRef<HTMLDivElement | null>(null); // 검색 버튼 DOM 참조
    //          state: 검색 버튼 상태          //
    const [status, setStatus] = useState<boolean>(false); // 검색창 열림 여부
    //          state: 검색어 상태          //
    const [word, setWord] = useState<string>(''); // 입력한 검색어
    //          state: 검색어 path variable 상태          //
    const { searchWord } = useParams(); // userParams - URL 파라미터에서 값 가져오기 (searchWord) 

    //          event handler: 검색어 변경 이벤트 처리 함수          //
    //사용자가 입력창에 타이핑할 때 word 상태 업데이트
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(value);
    }
    //          event handler: 검색어 키 이벤트 처리 함수          //
    //엔터를 누르면 검색 버튼 클릭 이벤트를 강제로 실행
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!searchButtonRef.current) return;
      searchButtonRef.current?.click();
    }
    //          event handler: 검색 아이콘 클릭 이벤트 처리 함수          //
    const onSearchButtonClickHandler = () => {
      if(!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    }
    
    //          effect: 검색어 path variable 변경 될 때마다 실행될 함수          //
    //주소에 searchWord가 있을 경우, 검색창을 열고 입력창에 값 채움
    useEffect(() => {
      if(searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord])

    if(!status)
    //          render: 검색 버튼 컴포넌트 렌더링 (클릭 false 상태)          //
    return (
    <div className='icon-button' onClick={onSearchButtonClickHandler}>
      <div className='icon search-light-icon'></div>
    </div>
    );
    //          render: 검색 버튼 컴포넌트 렌더링 (클릭 true 상태)          //
    return (
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchWordChangeHandler}/>
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler} onKeyDown={onSearchWordKeyDownHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    );
  }

  //          component: 로그인 또는 마이페이지 버튼 컴포넌트          //
  const MyPageButton = () => {

    //          state: userEmail path variable 상태          //
    const { userEmail } = useParams();

    //          event handler: 마이페이지 버튼 클릭 이벤트 처리 함수         //
    const onMypageButtonClickHandler = () => {
      if(!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }
    //          event handler: 로그아웃 버튼 클릭 이벤트 처리 함수         //
    const onSignOutMypageButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());
    }
    //          event handler: 로그인 버튼 클릭 이벤트 처리 함수         //
    const onSignInButtonClickHandler = () =>  {
      navigate(AUTH_PATH());
    }

    //          render: 로그아웃 버튼 컴포넌트 렌더링          //
    if(isLogin && userEmail === loginUser?.email)
    return <div className='white-button' onClick={onSignOutMypageButtonClickHandler}>{'로그아웃'}</div>;
    //          render: 마이페이지 버튼 컴포넌트 렌더링          //
    if(isLogin)
    return <div className='white-button' onClick={onMypageButtonClickHandler}>{'마이페이지'}</div>;
    //          render: 로그인 버튼 컴포넌트 렌더링          //
    return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;
  }

  //          component: 업로드 버튼 컴포넌트          //
  const Uploadbutton = () => {

    //          state: 게시물 상태         //
    const { title, content, boardImageFileList, resetBoard } = useBoardStore();

    //          event handler: 업로드 버튼 클릭 이벤트 처리 함수          //
    const onUploadButtonClickHandler = () => {

    }

    //          render: 업로드 버튼 컴포넌트 렌더링         //
    if(title && content)
    return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>
    //          render: 업로드 불가 버튼 컴포넌트 렌더링         //
    return <div className='disable-button'>{'업로드'}</div>
  }

  //          effect: path가 변경될 때마다 실행될 함수          //
  // useEffect - 리액트 훅 중 하나, 컴포넌트가 렌더링된 이후에 실행할 부수 효과를 정의하는 함수
  // ex) API 호출, 이벤트 등록/해제, 특정 값이 변할 때 동작 실행, DOM 직접 조작
  // 첫 번째 인자: 실행할 함수 - pathname 값이 바뀔 때마다 현재 페이지가 어떤 페이지인지 판별하고, 각각의 상태(setAuthPage, setMainPage, ...)를 업데이트함
  // 두 번째 인자: [pathname] - pathname 값이 바뀔 때마다 useEffect 안의 함수가 실행됨 
  // => URL 경로가 바뀔 때마다 실행되는 로직
  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);
    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage);
    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setSearchPage(isSearchPage);
    const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
    setBoardDetailPage(isBoardDetailPage);
    const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
    setBoardWritePage(isBoardWritePage);
    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
    setBoardUpdatePage(isBoardUpdatePage);
    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage);
  }, [pathname]);

  //          render: 헤더 레이아웃 렌더링         //
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'Hoons Board'}</div>
        </div>
        <div className='header-right-box'>
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MyPageButton />}
          {(isBoardWritePage || isBoardUpdatePage) && <Uploadbutton />}
        </div>
      </div>
    </div>
  )
}

