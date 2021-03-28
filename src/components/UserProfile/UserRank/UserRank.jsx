import React from 'react';
import UserIcon from '../../UserIcon/UserIcon';
import UserProgressBar from '../../UserProgressBar/UserProgressBar';

import styles from './UserRank.module.scss';

const UserRank = ({ data }) => {
  const { rank, previousLevelScore, currentScoreAmount, nextLevelScore } = data

  return (
    <div className={styles.UserRank}>
      <div className={styles.userIcon}>
        <UserIcon type={'main'} rank={rank} />
      </div>
      <h3>{rank}</h3>
      <h4>To next rank:</h4>
      <UserProgressBar
        template={'profile'}
        previousLevelScore={previousLevelScore}
        currentScoreAmount={currentScoreAmount}
        nextLevelScore={nextLevelScore}
      />
      <h4>Total points: {currentScoreAmount}</h4>
    </div>
  );

}

export default UserRank;
