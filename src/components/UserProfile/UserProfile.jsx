import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserProfileNav from './UserProfileNav/UserProfileNav';
import UserRank from './UserRank/UserRank';
import UserInfo from './UserInfo/UserInfo';
import selector from './UserProfile.selector';
import { useHistory } from 'react-router-dom';
import { faUserTie, faBell, faTrophy } from '@fortawesome/free-solid-svg-icons';

import styles from './UserProfile.module.scss';
import UserNotifications from './UserNotifications/UserNotifications';


const pages = [
  {id: 1, title: 'User info', icon: faUserTie},
  {id: 2, title: 'Notifications', icon: faBell},
  {id: 3, title: 'Rankings', icon: faTrophy}
]

const UserProfile = () => {
  const history = useHistory()
  const [activePage, setActivePage] = useState(history.location.state?.page ?? 1)
  const { user } = useSelector(selector)

  useEffect(() => {
    if (history.location.state?.page && history.location.state?.page !== activePage) {
      setActivePage(history.location.state?.page)
    }
  }, [history.location.state])

  useEffect(() => {
    if (activePage !== history.location.state?.page) {
      history.replace({
        ...history.location,
        state: {
          page: activePage
        }
      });
    }
  }, [activePage])

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

      {activePage === 2
        ? <UserNotifications />
        : ''
      }
    </div>
  );

}

export default UserProfile;