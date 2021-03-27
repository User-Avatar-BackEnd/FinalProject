import React,{useState, useEffect, useRef} from "react";
import {useDispatch} from 'react-redux';
import style from './BoardModal.module.scss';
import {addBoard, editBoard} from '../../../store/ducks/duckBoardsPanel';

export const BoardModal = ({close, flag, id, index}) => {
    const dispatch = useDispatch();

    useEffect(()=>textInput.current.focus(),[])
    const textInput = useRef(null);

    const [text, setText] = useState(flag);
    const changeText = (e) =>{
        setText(e.target.value);
    }

    const prevent = (e) => {
        e.preventDefault();
    }

    const Save = (e) =>{
        if (e.keyCode === 13) {
            if(text.trim().length){
                if(flag){
                    dispatch(editBoard(text, id, index));
                }else{
                    dispatch(addBoard(text));
                }
            }
            close();
        }
    }

    const Close = () =>{
        close();
    }

    return (
        <div onClick ={prevent} className={style.window}>
            <div className={style.BoardModal}>
                <span className={style.close} onClick={close}/>
                {flag ? <h3>Edit board title</h3> : <h3>Add new board</h3>}
                <div className={style.title}>
                    <textarea onKeyDown ={Save} ref ={textInput} className ={style.area} defaultValue ={flag} onChange ={changeText} onBlur ={Close} />
                </div>

            </div>
        </div>
    )
}
