import React from "react";
import style from './UserList.module.scss'
import {User} from "./User/User";

const usersTest = [
    {id: 1, place: 1, rank: 1, username: 'Vasya', points: 100},
    {id: 2, place: 2, rank: 2, username: 'Vasya1', points: 90}
]


export const UserList = ({users, page, onPageChanged, pageSize}) => {

    return (
        <div className={style.Users}>
            <div className={style.header}>
                <span>Place</span>
                <span>Rank</span>
                <span>Username</span>
                <span>Points</span>
            </div>
            {/*{users.map(user => <User user={user}/>)}*/}
            {usersTest.map(user => <User user={user}/>)}
        </div>
    )
}
