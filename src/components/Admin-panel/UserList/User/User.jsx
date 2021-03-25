import React from "react";
import style from './User.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export const User = ({user}) => {
    return (
        <div className={style.User}>
            <span>{user.place}</span>
            {/*<span>{user.rank}</span>*/}
            <div className={style.icon}>
                <FontAwesomeIcon icon={faUser}/>
            </div>
            <Link to={`/user-info/${user.id}`}>
                <a href="#">{user.username}</a>
            </Link>
            <span>{user.points}</span>
            <button>admin</button>
        </div>
    )
}
