import React from 'react';
import style from './Header.module.scss';

export const Header = () => {
    return (
        <header>
        <div className={style.avatar}><img src="no_photo.jpg" alt="avatar" /></div>
        <div className={style.position}>10</div>
        <div className={style.progressBar}>
            <div className={style.progressBarFilled} />
        </div>
        <div className={style.userName}>Vasya1234</div>
    </header>)
}