import React from "react";
import style from './Board.module.scss'

export const Board = () => {

const title = 'New Board'

    return (
        <div className={style.Board}>
            <h2 title={title}>{title.length >= 7 ? title.substr(0,7) + '...' : title}</h2>
        </div>
    )
}
