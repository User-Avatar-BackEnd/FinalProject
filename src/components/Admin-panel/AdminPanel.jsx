import React, {useState} from "react";
import style from './AdminPanel.module.scss'
import {faSlidersH, faUserTie} from "@fortawesome/free-solid-svg-icons";

import {UserList} from "./UserList/UserList";
import NavBar from "../NavBar/NavBar";
import useLoadUsers from "../../hooks/useLoadUsers";
import {UserSearch} from "./UserList/UserSerach/UserSearch";

const pages = [
    {id: 1, title: 'Users', icon: faUserTie},
    {id: 2, title: 'Admin settings', icon: faSlidersH},
]

export const AdminPanel = () => {
    const [activePage, setActivePage] = useState(1)

    const [filter, setFilter] = useState('')

    const {isLoading, users, page, setPage, error} = useLoadUsers()

    const onSearch = (user) => {
        setFilter(user)
    }

    return (
        <div className={style.AdminPanel}>
            <NavBar title={'Admin Panel'} pages={pages} activePage={activePage} changePage={setActivePage}/>
            {activePage === 1
                ? <div className={style.container}>
                    <UserSearch onSearch={onSearch}/>
                    <UserList filter={filter} users={users.filter(user => user.name.includes(filter))} page={page}
                              onPageChanged={setPage}/>
                </div>
                : null
            }
        </div>
    )
}
