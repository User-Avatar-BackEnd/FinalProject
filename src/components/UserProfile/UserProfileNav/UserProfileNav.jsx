import React from 'react';
import UserProfileNavLink from './UserProfileNavLink/UserProfileNavLink';

import styles from './UserProfileNav.module.scss';

const UserProfileNav = ({ pages, activePage, changePage }) => {

  return (
    <div className={styles.UserProfileNav}>
      <h2>User Profile</h2>
      {pages.map((page) => {
        return <UserProfileNavLink
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

export default UserProfileNav;