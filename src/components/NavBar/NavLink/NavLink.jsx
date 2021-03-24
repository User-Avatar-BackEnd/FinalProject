import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './NavLink.module.scss';

const NavLink = ({ id, title, icon, active, onClick }) => {
  const classes = classNames(styles.NavLink, active ? styles.active : '')

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

export default NavLink;
