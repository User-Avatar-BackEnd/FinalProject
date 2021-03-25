import React from "react";
import style from './User.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faUser} from "@fortawesome/free-solid-svg-icons";

export const User = ({user}) => {
    return (

        <div className={style.User}>
            <span>{user.place}</span>
            {/*<span>{user.rank}</span>*/}
            <div className={style.icon}>
                <FontAwesomeIcon icon={faUser}/>
            </div>
            <a href="">{user.username}</a>
            <span>{user.points}</span>
            <button>admin</button>
        </div>
    )
}
