import React, { useState } from 'react';
import UserProfileNav from './UserProfileNav/UserProfileNav';
import UserRank from './UserRank/UserRank';
import UserInfo from './UserInfo/UserInfo';
import { faUserTie, faBell, faTrophy } from '@fortawesome/free-solid-svg-icons';

import styles from './UserProfile.module.scss';

const pages = [
  {id: 1, title: 'User info', icon: faUserTie},
  {id: 2, title: 'Notifications', icon: faBell},
  {id: 3, title: 'Rankings', icon: faTrophy}
]

const info = {
  email: "test@gmail.com",
  login: "user12351",
  invitesAmount: 3
}

const rank = {
  rank: "Cossack",
  previousLevelScore: 300,
  currentScoreAmount: 352,
  nextLevelScore: 500
}

const UserProfile = () => {
  const [activePage, setActivePage] = useState(1)

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