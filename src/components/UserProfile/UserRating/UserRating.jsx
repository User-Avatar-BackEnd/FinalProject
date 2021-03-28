import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { LoopCircleLoading } from 'react-loadingg';
import API from '../../../config/API';
import UserIcon from '../../UserIcon/UserIcon';

import styles from './UserRating.module.scss';

const RatingItem = ({user}) => {

  let isCurrentBackground;

  if (user.isCurrentPlayer) {
    isCurrentBackground = {
      background: `#ffffc3`
    }
  }

  return (
    <div className={styles.ratingItem} style={isCurrentBackground}>
      <div className={styles.ratingItemColumn}>{user.ratePosition}</div>
      <div className={styles.ratingItemColumn}><div><UserIcon type={'small'} rank={user.rank}/></div> <div>{user.rank}</div></div>
      <div className={styles.ratingItemColumn}><b>{user.login}</b></div>
      <div className={styles.ratingItemColumn}>{user.score}</div>
    </div>
  )
}

const UserRating = () => {
  const [users, setUsers] = useState({})
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect(() => {
    setLoading(true)
    let isCancelled = false

    API({
      method: 'get',
      url: `/account/rate`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!isCancelled) {
          setUsers(response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false)
        }
      })

    return () => isCancelled = true;
  },[])

  const topBoard = users.topUsers;
  const underTopUsers = users.underTopUsers;

  return (
    <div className={styles.UserRating}>
      <h2>Leaderboard</h2>
      <div className={styles.ratingItem}>
        <div className={styles.ratingItemColumn}><b>PLACE</b></div>
        <div className={styles.ratingItemColumn}><b>RANK</b></div>
        <div className={styles.ratingItemColumn}><b>USERNAME</b></div>
        <div className={styles.ratingItemColumn}><b>POINTS</b></div>
      </div>
      {loading
        ? <LoopCircleLoading color={'orange'} style={{position: 'relative', margin: '20px auto'}}/>
        : <>
          {topBoard?.map((currUser) => <RatingItem key={currUser.id} user={currUser}/>)}
          {underTopUsers?.length !== 0 && (
            <div className={classNames(styles.ratingItem, styles.divider)}>. . .</div>
          )}
          {underTopUsers?.length !== 0 && (
            underTopUsers?.map((currUser) => <RatingItem key={currUser.id} user={currUser}/>)
          )}
        </>
      }
    </div>
  )
}

export default UserRating;