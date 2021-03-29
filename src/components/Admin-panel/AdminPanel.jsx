import React, {useEffect, useState} from "react";
import style from './AdminPanel.module.scss'
import {faSlidersH, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import {UserList} from "./UserList/UserList";
import NavBar from "../NavBar/NavBar";
import useLoadUsers from "../../hooks/useLoadUsers";
import {UserSearch} from "./UserList/UserSerach/UserSearch";
import _ from "lodash";
import Pagination from "react-js-pagination";
import {useSelector} from "react-redux";
import AdminEvents from './AdminEvents/AdminEvents';

const pages = [
    {id: 1, title: 'Users', url: '/', icon: faUserTie},
    {id: 2, title: 'Admin settings', url: '/settings', icon: faSlidersH},
]

export const AdminPanel = () => {

    const {isLoading, users, page, setPage, error} = useLoadUsers()

    const [filter, setFilter] = useState('')
    let { path } = useRouteMatch();
    const history = useHistory()
    const role = useSelector(state => state.user.data.role, _.isEqual)

    useEffect(() => {
        if (role !== 'admin') {
            history.replace('/board')
        }
    }, [])

    const onSearch = (user) => {
        setFilter(user)
    }

    return (
        <div className={style.AdminPanel}>
            <NavBar title={'Admin Panel'} pages={pages} path={path} />
            <Switch>
                <Route path={path} exact>
                    <div className={style.container}>
                        <UserSearch onSearch={onSearch}/>
                        <UserList filter={filter}
                                  users={_.filter(users.users, (v) => _.includes(v.login, filter))}/>
                        {
                            users.totalPages &&
                            <div className={style.Pagination}>
                                <Pagination
                                  activePage={page}
                                  itemsCountPerPage={10}
                                  totalItemsCount={users.totalPages}
                                  pageRangeDisplayed={5}
                                  onChange={setPage}/>
                            </div>
                        }
                    </div>
                </Route>
                <Route path={`${path}/settings`}>
                    <AdminEvents />
                </Route>
            </Switch>
        </div>
    )
}
