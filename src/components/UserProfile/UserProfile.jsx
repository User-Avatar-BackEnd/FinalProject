import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { faUserTie, faBell, faTrophy } from '@fortawesome/free-solid-svg-icons';
import UserProfileNav from './UserProfileNav/UserProfileNav';
import UserRank from './UserRank/UserRank';
import UserInfo from './UserInfo/UserInfo';
import selector from './UserProfile.selector';
import UserNotifications from './UserNotifications/UserNotifications';
import UserRating from './UserRating/UserRating';

import styles from './UserProfile.module.scss';

const pages = [
  {id: 1, title: 'User info', url: '/', icon: faUserTie},
  {id: 2, title: 'Notifications', url: '/notifications', icon: faBell},
  {id: 3, title: 'Rankings', url: '/rankings', icon: faTrophy}
]

const UserProfile = () => {
  let { path } = useRouteMatch();
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
      <UserProfileNav path={path} pages={pages} />
      <Switch>
        <Route path={path} exact>
          <div className={styles.container}>
            <UserRank data={rank} />
            <UserInfo data={info} />
          </div>
        </Route>
        <Route path={`${path}/notifications`}>
          <UserNotifications />
        </Route>
        <Route path={`${path}/rankings`}>
          <UserRating />
        </Route>
      </Switch>
    </div>
  );

}

export default UserProfile;