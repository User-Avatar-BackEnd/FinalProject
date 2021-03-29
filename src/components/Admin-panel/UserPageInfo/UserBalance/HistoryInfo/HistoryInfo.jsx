import React from "react";
import moment from "moment";
import style from './HistoryInfo.module.scss';

export const HistoryInfo = ({history}) => {

    const getDate = (date) => {
        return moment(date).format('DD MMM, YYYY, HH:mm')
    }

    return (
        <div className={style.HistoryInfo}>
            <span>{getDate(history.dateTime)}</span>
            <span>{history.eventName}</span>
            <span>{history.score}</span>
        </div>
    )
}
