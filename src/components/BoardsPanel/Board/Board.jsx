import React, {useState} from "react";
import style from './Board.module.scss';
import {useDispatch} from 'react-redux';
import {deleteBoard} from '../../../ducks/duckBoardsPanel';
import {BoardModal} from '../BoardModal/BoardModal'

export const Board = ({title, id, index}) => {
    const dispatch = useDispatch();

    const [isShow, setIsShow] = useState(false)

    const close = () => {
        setIsShow(false)
    }

    const edit = (e) => {
        e.preventDefault();
        setIsShow(true)
    }

    const del = (e) =>{
        e.preventDefault();
        dispatch(deleteBoard(id, index));
    }
    return (
            <div className={style.Board}>
                <h2 title={title}>{title.length >= 10 ? title.substr(0,10) + '...' : title}</h2>
                <button onClick ={del} className={style.delete}><img src='../../images/del.svg' alt='delete'/></button>
                <button onClick ={edit} className={style.edit}><img src='../../images/edit.png' alt='edit'/></button>
                {isShow ? <BoardModal id ={id} index ={index} flag ={title} close={close}/> : null}
            </div>
    )
}
