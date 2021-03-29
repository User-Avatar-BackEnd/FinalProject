import React from 'react';
import NavLink from './NavLink/AdminNavLink';

import styles from './NavBar.module.scss';

const NavBar = ({ title, pages, path }) => {

    return (
        <div className={styles.NavBar}>
            <h2>{title}</h2>
            {pages.map((page) => {
                return <NavLink
                    id={page.id}
                    title={page.title}
                    url={`${path}${page.url}`}
                    icon={page.icon}
                    key={page.id}
                />
            })}
        </div>
    );

}

export default NavBar;
