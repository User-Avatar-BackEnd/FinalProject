import React from "react";
import {useParams} from "react-router-dom";
import _ from "lodash";
import {UserInformation} from "./UserInformation/UserInformation";
import {UserBalance} from "./UserBalance/UserBalance";
import {HistoryList} from "./UserBalance/HistoryList/HistoryList";
import useLoadedHistory from "../../../hooks/useLoadedHistory";
import useLoadUsers from "../../../hooks/useLoadUsers";
import UserIcon from "../../UserIcon/UserIcon";
import style from './UserPageInfo.module.scss';

export const UserPageInfo = () => {
    const {login} = useParams()
    const {users} = useLoadUsers()

    const {history} = useLoadedHistory(login)

    return (
        <div className={style.wrapper}>
            {_.filter(users.users, (v) => _.includes(v.login, login))
                .map(el =>
                    <div className={style.UserPageInfo} key={login}>
                    <div className={style.container}>
                        <UserIcon rank={el.rank} type={'main'}/>
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
