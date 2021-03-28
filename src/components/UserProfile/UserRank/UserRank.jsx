import React from 'react';
import UserIcon from '../../UserIcon/UserIcon';
import UserProgressBar from '../../UserProgressBar/UserProgressBar';

import styles from './UserRank.module.scss';

const UserRank = ({ rank }) => {

  return (
    <div className={styles.UserRank}>
      <div className={styles.userIcon}>
        <UserIcon type={'main'} rank={rank} />
      </div>
      <h3>{rank}</h3>
    </div>
  );

}

export default UserRank;
