import React, {useState} from "react";
import style from './HistoryList.module.scss'
import _ from "lodash";
import {HistoryInfo} from "../HistoryInfo/HistoryInfo";

export const HistoryList = ({history}) => {

    return (
        <div className={style.HistoryList}>
            <div>
                <div className={style.header}>
                    <span>Date</span>
                    <span>Action</span>
                    <span>Reward</span>
                </div>
                {_.map(history, (data) => <HistoryInfo hey={data.dateTime} history={data}/>)}
            </div>
        </div>
    )
}
