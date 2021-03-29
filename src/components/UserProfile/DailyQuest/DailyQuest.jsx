import React from 'react';
import classNames from 'classnames';

import styles from './DailyQuest.module.scss';

const DailyQuest = ({ title, isCompleted }) => {

  return (
    <div className={styles.DailyQuest}>
      <div className={styles.header}>
        <h3>DAILY QUEST</h3>
      </div>
      <div className={classNames(styles.quest, isCompleted ? styles.completed : '')}>
        <div>
          <h4>{title}</h4>
          <span>x2 points!</span>
        </div>
        {isCompleted &&
          <p className={styles.completedMessage}>Completed</p>
        }
      </div>
    </div>
  );

}

export default DailyQuest;
