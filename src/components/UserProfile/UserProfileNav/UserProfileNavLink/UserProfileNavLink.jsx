import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './UserProfileNavLink.module.scss';

const UserProfileNavLink = ({ id, title, icon, active, onClick }) => {
  const classes = classNames(styles.UserProfileNavLink, active ? styles.active : '')

  const selectPage = () => {
    onClick(id)
  }

  return (
    <div className={classes} onClick={selectPage}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <span>{title}</span>
    </div>
  );

}

export default UserProfileNavLink;