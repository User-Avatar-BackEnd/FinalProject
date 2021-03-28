import React from 'react';
import UserIcon from '../../UserIcon/UserIcon';
import UserProgressBar from '../../UserProgressBar/UserProgressBar';

import styles from './UserRank.module.scss';

const UserRank = ({ data }) => {

  return (
    <div className={styles.UserRank}>
      <div className={styles.userIcon}>
        <UserIcon type={'main'} rank={data.rank} />
      </div>
      <h3>{data.rank}</h3>
    </div>
  );

}

export default UserRank;
