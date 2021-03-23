import React from "react";
import style from './BoardsPanel.module.scss'
import {AddBoard} from "./AddBoard/AddBoard";
import {Board} from "./Board/Board";

export const BoardsPanel = () => {

    return (
        <div className={style.BoardsPanel}>
            <h1>My Boards</h1>
            <div className={style.wrapper}>
                <Board/>
                <AddBoard/>
            </div>
        </div>
    )
}
