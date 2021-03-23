import React, {useState} from "react";
import style from './AddBoard.module.scss'
import {BoardModal} from "./BoardModal/BoardModal";

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
            {isShow ? <BoardModal close={close}/> : null}
        </div>
    )
}
