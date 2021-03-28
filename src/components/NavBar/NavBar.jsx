import React from 'react';
import NavLink from './NavLink/NavLink';

import styles from './NavBar.module.scss';

const NavBar = ({ title, pages, activePage, changePage }) => {

    return (
        <div className={styles.NavBar}>
            <h2>{title}</h2>
            {pages.map((page) => {
                return <NavLink
                    id={page.id}
                    title={page.title}
                    icon={page.icon}
                    active={page.id === activePage}
                    key={page.id}
                    onClick={changePage}
                />
            })}
        </div>
    );

}

export default NavBar;
