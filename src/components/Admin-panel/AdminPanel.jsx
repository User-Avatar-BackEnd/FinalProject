import React, {useState} from "react";
import style from './AdminPanel.module.scss'
import {faSlidersH, faUserTie} from "@fortawesome/free-solid-svg-icons";

import {UserList} from "./UserList/UserList";
import NavBar from "../NavBar/NavBar";
import useLoadUsers from "../../hooks/useLoadUsers";
import {UserSearch} from "./UserList/UserSerach/UserSearch";
import _ from "lodash";
import Pagination from "react-js-pagination";

const pages = [
    {id: 1, title: 'Users', icon: faUserTie},
    {id: 2, title: 'Admin settings', icon: faSlidersH},
]

export const AdminPanel = () => {
    const [activePage, setActivePage] = useState(1)

    const {isLoading, users, page, setPage, error} = useLoadUsers()

    const [filter, setFilter] = useState('')

    const onSearch = (user) => {
        setFilter(user)
    }

    return (
        <div className={style.AdminPanel}>
            <NavBar title={'Admin Panel'} pages={pages} activePage={activePage} changePage={setActivePage}/>
            {activePage === 1
                ? <div className={style.container}>
                    <UserSearch onSearch={onSearch}/>
                    <UserList filter={filter}
                              users={_.filter(users.users, (v) => _.includes(v.login, filter))}/>
                    <div className={style.Pagination}>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={10}
                            totalItemsCount={users.totalPages}
                            pageRangeDisplayed={5}
                            onChange={setPage}/>
                    </div>
                </div>
                : null
            }
        </div>
    )
}
//filter === '' ? users :
//
