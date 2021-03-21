import React from "react";
import style from './Comments.module.scss'

export const Comments = () => {
    return (
        <div className={style.Comments}>
            <div className={style.user}>
                <img src="" alt="" className={style.icon}/>
                <span>User1000</span>
            </div>
            <div className={style.commentContainer}>
                <div className={style.wrapper}>
                    <p>commentContainer</p>
                </div>
                <div className={style.action}>
                    <p>change</p>
                    <p>delete</p>
                </div>
            </div>
        </div>
    )
}
