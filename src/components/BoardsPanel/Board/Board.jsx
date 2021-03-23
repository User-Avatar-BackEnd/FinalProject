import React from "react";
import { useHistory } from 'react-router-dom';
import style from './Board.module.scss'

export const Board = ({title, id}) => {
    const history = useHistory();

    const goToBoard = () => {
        history.push('/board')  // /board =${id}
      }

    return (
        <div onClick ={goToBoard} className={style.Board}>
            <h2 title={title}>{title.length >= 7 ? title.substr(0,7) + '...' : title}</h2>
        </div>
    )
}
