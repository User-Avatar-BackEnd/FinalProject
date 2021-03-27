import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { faUserTie, faBell, faTrophy } from '@fortawesome/free-solid-svg-icons';
import UserProfileNav from './UserProfileNav/UserProfileNav';
import UserRank from './UserRank/UserRank';
import UserInfo from './UserInfo/UserInfo';
import selector from './UserProfile.selector';
import UserNotifications from './UserNotifications/UserNotifications';
import UserRating from './UserRating/UserRating';

import styles from './UserProfile.module.scss';

const pages = [
  {id: 1, title: 'User info', icon: faUserTie},
  {id: 2, title: 'Notifications', icon: faBell},
  {id: 3, title: 'Rankings', icon: faTrophy}
]

const RATING = {
  "topUsers": [
    {
      "id": 1,
      "ratePosition": 1,
      "login": "admin",
      "rank": "Hetman",
      "score": 100536,
      "isCurrentPlayer": false
    },
    {
      "id": 7,
      "ratePosition": 2,
      "login": "user4",
      "rank": "Hetman",
      "score": 2345,
      "isCurrentPlayer": false
    },
    {
      "id": 16,
      "ratePosition": 3,
      "login": "user13",
      "rank": "Hetman",
      "score": 2345,
      "isCurrentPlayer": false
    },
    {
      "id": 12,
      "ratePosition": 4,
      "login": "user9",
      "rank": "Hetman",
      "score": 1234,
      "isCurrentPlayer": false
    },
    {
      "id": 5,
      "ratePosition": 5,
      "login": "user2",
      "rank": "Esaul",
      "score": 854,
      "isCurrentPlayer": false
    },
    {
      "id": 6,
      "ratePosition": 6,
      "login": "user3",
      "rank": "Esaul",
      "score": 742,
      "isCurrentPlayer": false
    },
    {
      "id": 9,
      "ratePosition": 7,
      "login": "user6",
      "rank": "Cossack",
      "score": 356,
      "isCurrentPlayer": false
    },
    {
      "id": 3,
      "ratePosition": 8,
      "login": "strin456g",
      "rank": "Cossack",
      "score": 307,
      "isCurrentPlayer": false
    },
    {
      "id": 11,
      "ratePosition": 9,
      "login": "user8",
      "rank": "Crewman",
      "score": 245,
      "isCurrentPlayer": false
    },
    {
      "id": 8,
      "ratePosition": 10,
      "login": "user5",
      "rank": "Crewman",
      "score": 243,
      "isCurrentPlayer": false
    }
  ],
  "underTopUsers": [
    {
      "id": 10,
      "ratePosition": 13,
      "login": "user7",
      "rank": "Crewman",
      "score": 131,
      "isCurrentPlayer": false
    },
    {
      "id": 2,
      "ratePosition": 14,
      "login": "string",
      "rank": "NPC",
      "score": 50,
      "isCurrentPlayer": true
    },
    {
      "id": 14,
      "ratePosition": 15,
      "login": "user11",
      "rank": "NPC",
      "score": 34,
      "isCurrentPlayer": false
    }
  ]
}

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

      {activePage === 3
        ? <UserRating rating={RATING}/>
        : ''
      }
    </div>
  );

}

export default UserProfile;