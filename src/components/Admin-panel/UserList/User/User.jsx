import React, {useState} from "react";
import style from './User.module.scss'
import {Link} from "react-router-dom";
import UserIcon from "../../../UserIcon/UserIcon";
import {updateRole} from "../../../../API/userApi";

export const User = ({user}) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [role, setIsRole] = useState(user.role)

    const onAdmin = (login) => {
        setIsAdmin(!isAdmin)
        isAdmin ? setIsRole('user') : setIsRole('admin')
        updateRole(login, role === 'user' ? 'admin' : 'user').then(r => console.log(r))
    }
    console.log()
    return (
        <div className={style.User}>
            <span>{user.position}</span>
            <div className={style.icon}>
                <UserIcon rank={user.rank} type={'user'}/>
            </div>
            <Link to={`/user-info/${user.login}`}>
                <a href="#"
                   title={user.login}>{user.login.length < 12 ? user.login : user.login.slice(0, 12) + '...'}</a>
            </Link>
            <span>{user.score}</span>
            <button className={role === 'admin' ? style.admin : null}
                    onClick={() => onAdmin(user.login)}>{role === 'admin' ? 'admin' : 'user'}</button>
        </div>
    )
}
