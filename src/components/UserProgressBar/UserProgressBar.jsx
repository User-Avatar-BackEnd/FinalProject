import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar'
import classNames from 'classnames';

import styles from './UserProgressBar.module.scss';

const settings = {
  profile: {
    bgcolor: 'orange',
    height: '25px',
    width: '100%',
    baseBgColor: '#e0e0de',
    isLabelVisible: false
  },
  header: {
    bgcolor: 'orange',
    height: '15px',
    width: '100%',
    baseBgColor: '#e0e0de',
    isLabelVisible: false
  }
}

const UserProgressBar = ({ template, previousLevelScore, currentScoreAmount, nextLevelScore }) => {
  const progressPercent =
    Math.round((currentScoreAmount - previousLevelScore) / ((nextLevelScore - previousLevelScore) / 100))

  const displayPoints =
    currentScoreAmount !== nextLevelScore
      ? `${currentScoreAmount - previousLevelScore} / ${nextLevelScore - previousLevelScore}`
      : currentScoreAmount

  return (
    <div className={classNames(styles.UserProgressBar, styles[template])}>
      <ProgressBar completed={progressPercent} {...settings[template]} />
      <div className={classNames(styles.progressLabel, styles[template])}>
        <span>{displayPoints}</span>
      </div>
    </div>
  );

}

export default UserProgressBar;
