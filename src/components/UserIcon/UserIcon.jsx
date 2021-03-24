import React from 'react';
import classNames from 'classnames';

import styles from './UserIcon.module.scss';

const UserIcon = ({ type, rank }) => {

  return (
    <div className={classNames(styles.UserIcon, styles[type], styles[rank])}>

    </div>
  );

}

export default UserIcon;