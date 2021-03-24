import React from "react";
import { useParams } from 'react-router-dom';
import style from './Board.module.scss'

export const Board = ({title}) => {
    const {id} = useParams();

    return (
            <div className={style.Board}>
                <h2 title={title}>{title.length >= 7 ? title.substr(0,7) + '...' : title}</h2>
            </div>
    )
}
