import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import UserProfileNav from './UserProfileNav/UserProfileNav';
import UserRank from './UserRank/UserRank';
import UserInfo from './UserInfo/UserInfo';
import selector from './UserProfile.selector';
import { faUserTie, faBell, faTrophy } from '@fortawesome/free-solid-svg-icons';

import styles from './UserProfile.module.scss';


const pages = [
  {id: 1, title: 'User info', icon: faUserTie},
  {id: 2, title: 'Notifications', icon: faBell},
  {id: 3, title: 'Rankings', icon: faTrophy}
]

const UserProfile = () => {
  const [activePage, setActivePage] = useState(1)
  const { user } = useSelector(selector)

  const info = {
    email: user.email,
    login: user.login,
    invitesAmount: user.invitesAmount
  }

  const rank = {
    rank: user.rank,
    previousLevelScore: user.previousLevelScore,
    currentScoreAmount: user.currentScoreAmount,
    nextLevelScore: user.nextLevelScore
  }

  return (
    <div className={styles.UserProfile}>
      <UserProfileNav pages={pages} activePage={activePage} changePage={setActivePage} />
      {activePage === 1
        ? <div className={styles.container}>
            <UserRank data={rank} />
            <UserInfo data={info} />
          </div>
        : ''
      }
    </div>
  );

}

export default UserProfile;