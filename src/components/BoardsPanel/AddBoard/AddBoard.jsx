import React, {useState} from "react";
import {BoardModal} from "../BoardModal/BoardModal";
import style from './AddBoard.module.scss';

export const AddBoard = () => {
    const [isShow, setIsShow] = useState(false)

    const addBoard = () => {
        setIsShow(true)
    }

    const close = () => {
        setIsShow(false)
    }

    return (
        <div className={style.AddBoard}>
            <button className={style.add} onClick={addBoard}>+</button>
            {isShow ? <BoardModal flag ={''} close={close}/> : null}
        </div>
    )
}
