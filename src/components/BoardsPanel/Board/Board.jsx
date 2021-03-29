import React, {useState} from "react";
import style from './Board.module.scss';
import {useDispatch} from 'react-redux';
import {deleteBoard} from '../../../store/ducks/duckBoardsPanel';
import {BoardModal} from '../BoardModal/BoardModal'
import DelModal from './DeleteModal/DeleteModal';

export const Board = ({title, id, index, editable}) => {
    const dispatch = useDispatch();

    const [isShow, setIsShow] = useState(false)
    const close = () => {
        setIsShow(false)
    }

    const [showDelete, setDelete] = useState(false);
    const showDeleteModal = (e) => {
        e.preventDefault();
        setDelete(true);
    }
    const closeDeleteModal = () => {
        setDelete(false)
    }

    const edit = (e) => {
        e.preventDefault();
        setIsShow(true)
    }

    const del = () =>{
        dispatch(deleteBoard(id, index));
    }

    return (
            <div className={style.Board}>
                <h2 title={title}>{title.length >= 12 ? title.substr(0,12) + '...' : title}</h2>
                <button onClick ={showDeleteModal} className={style.delete}><img src='../../images/del.svg' alt='delete'/></button>
                {editable ? <button onClick ={edit} className={style.edit}><img src='../../images/edit.png' alt='edit'/></button> : null}
                {isShow ? <BoardModal id ={id} index ={index} flag ={title} close={close}/> : null}
                {showDelete ? <DelModal del ={del} close={closeDeleteModal} /> : null}
            </div>
    )
}
