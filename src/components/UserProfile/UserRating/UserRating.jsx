import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './UserRating.module.scss';
import API from '../../../config/API';
import UserIcon from '../../UserIcon/UserIcon';

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

  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect(() => {
    API({
      method: 'get',
      url: `/account/rate`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },[])

  const topBoard = users.topUsers;
  const underTopUsers = users.underTopUsers;

  return (
    <div className={styles.UserRating}>
      <h2>Rating</h2>
      <div className={styles.ratingItem}>
        <div className={styles.ratingItemColumn}><b>PLACE</b></div>
        <div className={styles.ratingItemColumn}><b>RANK</b></div>
        <div className={styles.ratingItemColumn}><b>USERNAME</b></div>
        <div className={styles.ratingItemColumn}><b>POINTS</b></div>
      </div>
      {topBoard?.map((currUser) => <RatingItem key={currUser.id} user={currUser}/>)}
      {underTopUsers?.length !== 0 && (
        <div className={classNames(styles.ratingItem, styles.divider)}>. . .</div>
      )}
      {underTopUsers?.length !== 0 && (
        underTopUsers?.map((currUser) => <RatingItem key={currUser.id} user={currUser}/>)
      )}
    </div>
  )
}

export default UserRating;