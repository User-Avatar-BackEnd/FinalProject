import React from 'react';
import UserProfileNavLink from './UserProfileNavLink/UserProfileNavLink';

import styles from './UserProfileNav.module.scss';

const UserProfileNav = ({path, pages}) => {

    return (
        <div className={styles.UserProfileNav}>
            <h2>User Profile</h2>
            {pages.map((page) => {
                return <UserProfileNavLink
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

export default UserProfileNav;
