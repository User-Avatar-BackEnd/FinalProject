import React from "react";
import style from './UserPageInfo.module.scss'
import UserRank from "../../UserProfile/UserRank/UserRank";
import {UserInformation} from "./UserInformation/UserInformation";
import {UserBalance} from "./UserBalance/UserBalance";

const rank = {
    rank: "Cossack",
    previousLevelScore: 300,
    currentScoreAmount: 352,
    nextLevelScore: 500
}

const info = {
    email: "test@gmail.com",
    login: "user12351",
    role: 'user',
    invitesAmount: 3
}

const balance = 100


export const UserPageInfo = () => {
    return (
        <div className={style.UserPageInfo}>
            <div>
                <UserRank data={rank}/>
                <UserBalance balance={balance}/>
            </div>
            <UserInformation data={info}/>
        </div>
    )
}
