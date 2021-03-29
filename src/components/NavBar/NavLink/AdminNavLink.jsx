import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './AdminNavLink.module.scss';

const AdminNavLink = ({ id, title, url, icon}) => {

  return (
    <NavLink to={url} activeClassName={styles.active} exact={true} key={id}>
      <div className={styles.AdminNavLink}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <span>{title}</span>
      </div>
    </NavLink>
  );

}

export default AdminNavLink;
