import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './UserProfileNavLink.module.scss';

const UserProfileNavLink = ({ id, title, url, icon }) => {

  return (
    <NavLink to={url} activeClassName={styles.active} exact={true} key={id}>
      <div className={styles.UserProfileNavLink}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <span>{title}</span>
      </div>
    </NavLink>

  );

}

export default UserProfileNavLink;