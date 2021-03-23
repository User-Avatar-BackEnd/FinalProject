import React from "react";
import style from './AdminPanel.module.scss'

export const AdminPanel = () => {
    return (
        <div className={style.AdminPanel}>
            <h1>Admin panel</h1>
            <div className={style.wrapper}>
                <div className={style.tabs}>
                    <span>Users</span>
                    <span>Admin settings</span>
                </div>
                <hr/>
            </div>
        </div>
    )
}
