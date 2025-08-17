import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';

//          interface: Input Box 컴포넌트 Properties          //
interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    //setValue는 부모 컴포넌트에서 useState의 setter 함수를 전달받아 값 변경.
    setValue: Dispatch<SetStateAction<string>>; // 입력 값 변경 함수 (상위 컴포넌트에서 전달)
    error: boolean;

    icon?: string;
    onButtonClick?: () => void;

    message?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

//          component: Input Box 컴포넌트          //
// forwardRef를 쓰면 부모 컴포넌트가 ref로 직접 <input> DOM에 접근 가능
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

    //          state: properties          //
    const { label, type, placeholder, value, error, icon, message } = props;
    const { setValue, onButtonClick, onKeyDown } = props;

    //          event handler: input 값 변경 이벤트 처리 함수          //
    // 입력이 바뀔 때 setValue로 부모 컴포넌트의 상태 업데이트
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value); // 부모 상태값 변경
    };

    //          event handler: input 키 이벤트 처리 함수          //
    // 키 입력 시, 부모에서 정의한 onKeyDown이 있으면 실행
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);
    };

    //          render:Input Box 렌더링          //
    return (
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
                {onButtonClick !== undefined && (
                <div className='icon-button'>
                    {icon !== undefined && <div className={`icon ${icon}`}></div>}
                </div>
                )}
            </div>
            {message !== undefined && <div className='inputbox-message'>{message}</div>}
            
        </div>
    )

});

export default InputBox;