import React from "react";
import style from './BoardsPanel.module.scss'
import {AddBoard} from "./AddBoard/AddBoard";
import {Board} from "./Board/Board";
import {boards} from '../../store/config'

const BoardsPanel = () => {

    return (
        <div className={style.BoardsPanel}>
            <h1>My Boards</h1>
            <div className={style.wrapper}>
                {boards.map((item) =><Board key ={item.id} title ={item.title} id ={item.id}/>)}
                <AddBoard/>
            </div>
        </div>
    )
}

export default BoardsPanel;
