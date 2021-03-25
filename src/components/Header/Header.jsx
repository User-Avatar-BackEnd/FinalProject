import React from 'react';
import { useSelector } from 'react-redux';
import selector from './Header.selector';

import styles from './Header.module.scss';

const profilePictureUrl = {
  'NPC': "img/ranks/npc.jpg",
  'Crewman': "img/ranks/crewman.jpg",
  'Cossack': "img/ranks/cossack.jpg",
  'Centurion': "img/ranks/centurion.jpg",
  'Cossack captain': "img/ranks/cossack_captain.jpg",
  'Ataman': "img/ranks/ataman.jpg",
  'Hetman': "img/ranks/Hetman.jpg",
}

const Header = () => {
  const { user } = useSelector(selector)

  let percentage;
  let profilePic = profilePictureUrl[user.rank];

  if (user.currentScoreAmount >= 1000) {
    percentage = 100;
  } else {
    percentage = Math.floor((user.currentScoreAmount / user.nextLevelScore) * 100);
  }

  const percentageStyle = {
    width: `${percentage}%`,
  }

  return (
    <header className={styles.Header}>
      <img src="img/Trello_logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.avatar}><img src={profilePic} alt="avatar" /></div>
      <div className={styles.position}>{user.rank}</div>
      <div className={styles.progressBar}>
        <div className={styles.progressBarFilled} style={percentageStyle}/>
      </div>
      <div className={styles.userName}>{user.login}</div>
    </header>)
}

export default Header;