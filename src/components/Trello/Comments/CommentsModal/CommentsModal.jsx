import React from "react";
import style from './CommentsModal.module.scss'
import {AddComment} from "../AddComments/AddComment";
import {Comments} from "../Comments";

export const CommentsModal = ({boardId, card, onClose}) => {
    const {id} = card

    return (
        <div className={style.window}>
            <div className={style.CommentsModal}>
                <h2>Comments</h2>
                <div className={style.icon}>
                    <img src="../../images/comments.png" alt="" className={style.icon}/>
                    <span className={style.close} onClick={onClose}/>
                </div>
                <AddComment cardId={id} boardId={boardId}/>
                <Comments cardId={id} boardId={boardId}/>
            </div>
        </div>
    )
}
