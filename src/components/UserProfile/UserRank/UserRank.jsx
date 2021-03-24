import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

import styles from './UserRank.module.scss';
import UserIcon from '../../UserIcon/UserIcon';

const progressBarProps = {
  completed: 0,
  bgcolor: '#6a1b9a',
  height: '25px',
  width: '100%',
  baseBgColor: '#e0e0de',
  isLabelVisible: false
}

const UserRank = ({ data }) => {
  const { rank, previousLevelScore, currentScoreAmount, nextLevelScore } = data

  const progressPercent = Math.round((currentScoreAmount - previousLevelScore) / ((nextLevelScore - previousLevelScore) / 100))
  progressBarProps.completed = progressPercent

  return (
    <div className={styles.UserRank}>
      <div className={styles.userIcon}>
        <UserIcon type={'main'} rank={rank} />
      </div>
      <h3>{rank}</h3>
      <div className={styles.progressBar}>
        <ProgressBar {...progressBarProps} />
        <div className={styles.progressLabel}>
          <span>{currentScoreAmount - previousLevelScore} / {nextLevelScore - previousLevelScore}</span>
        </div>
      </div>
    </div>
  );

}

export default UserRank;