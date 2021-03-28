import React, {useState} from "react";
import style from './UserList.module.scss'
import {User} from "./User/User";
import _ from "lodash";
export const UserList = ({users}) => {

    return (
        <div className={style.Users}>
            <div>
                <div className={style.header}>
                    <span>Place</span>
                    <span>Rank</span>
                    <span>Username</span>
                    <span>Points</span>
                </div>
                {_.map(users, (user) => <User key={user.login} user={user}/>)}
            </div>
        </div>
    )
}
