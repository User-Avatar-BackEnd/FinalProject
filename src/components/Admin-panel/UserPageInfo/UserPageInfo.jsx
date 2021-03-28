import React from "react";
import style from './UserPageInfo.module.scss'
import UserRank from "../../UserProfile/UserRank/UserRank";
import {UserInformation} from "./UserInformation/UserInformation";
import {UserBalance} from "./UserBalance/UserBalance";
import {HistoryList} from "./UserHistory/HistoryList/HistoryList";
import {useParams} from "react-router-dom";
import useLoadedHistory from "../../../hooks/useLoadedHistory";
import useLoadUsers from "../../../hooks/useLoadUsers";
import _ from "lodash";

export const UserPageInfo = () => {
    const {login} = useParams()
    const {users} = useLoadUsers()

    const {history} = useLoadedHistory(login)

    return (
        <div className={style.wrapper}>
            {_.filter(users.users, (v) => _.includes(v.login, login))
                .map(el =>
                    <div className={style.UserPageInfo}>
                    <div className={style.container}>
                        <UserRank rank={el.rank}/>
                        <UserBalance balance={el.score} login={login}/>
                    </div>
                    <UserInformation role={el.role} login={login}/>)
                </div>
                )}
            <div className={style.history}>
                <h2>Action history</h2>
                <hr/>
                <HistoryList history={history}/>
            </div>
        </div>
    )
}
