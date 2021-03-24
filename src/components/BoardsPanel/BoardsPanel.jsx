import React from "react";
import { Link } from 'react-router-dom';
import style from './BoardsPanel.module.scss'
import {AddBoard} from "./AddBoard/AddBoard";
import {Board} from "./Board/Board";
import {boards} from '../../store/config'

const BoardsPanel = () => {

    return (
       
        <div className={style.BoardsPanel}>
            <h1>My Boards</h1>
            <div className={style.wrapper}>
                {boards.map((item) => <Link key ={item.id} to ={`/board/${item.id}`}><Board title ={item.title} /></Link>)}
                <AddBoard/>
            </div>
        </div>
    )
}

export default BoardsPanel;
