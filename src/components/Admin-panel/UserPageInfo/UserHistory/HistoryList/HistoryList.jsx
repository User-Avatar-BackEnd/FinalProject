import React, {useState} from "react";
import style from './HistoryList.scss'
import _ from "lodash";

export const HistoryList = ({history}) => {

    return (
        <div className={style.Users}>
            <div>
                <div className={style.header}>
                    <span>Date</span>
                    <span>Action</span>
                    <span>Reward</span>
                </div>
                {_.map(history, (data) => <HistoryInfo history={data}/>)}
            </div>
        </div>
    )
}
