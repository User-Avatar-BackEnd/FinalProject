import React, {useState} from "react";
import style from './AdminPanel.module.scss'
import {faSlidersH, faUserTie} from "@fortawesome/free-solid-svg-icons";

import {Users} from "./Users/Users";
import NavBar from "../NavBar/NavBar";

const pages = [
    {id: 1, title: 'Users', icon: faUserTie},
    {id: 2, title: 'Admin settings', icon: faSlidersH},
]

export const AdminPanel = () => {
    const [activePage, setActivePage] = useState(1)

    return (
        <div className={style.AdminPanel}>
            <NavBar title={'Admin Panel'} pages={pages} activePage={activePage} changePage={setActivePage}/>
            {activePage === 1
                ? <div className={style.container}>
                    <Users/>
                </div>
                : null
            }
        </div>
    )
}
