import React, { useState, useEffect } from 'react';
import UserIcon from '../../UserIcon/UserIcon';
import API from '../../../config/API';

import styles from './UserNotifications.module.scss';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([])

  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect(() => {
    API({
      method: 'get',
      url: '/account/invites',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setNotifications(response.data)
      })
      .catch(() => {
        setNotifications([])
      })
  }, [])

  const acceptInvite = (e) => {
    inviteResponse(1, e.target.getAttribute('data-id'))
  }

  const declineInvite = (e) => {
    inviteResponse(-1, e.target.getAttribute('data-id'))
  }

  const inviteResponse = (status, id) => {
    API({
      method: 'patch',
      url: `/account/invites/${id}/?status=${status}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setNotifications(notifications.filter(item => {
          return item.id !== Number(id)
        }))
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className={styles.UserNotifications}>
      {notifications.length === 0
        ? <h3>You have no notifications yet...</h3>
        : ''
      }
      {notifications.map(item => {
        return <div className={styles.notification} key={item.id}>
          <span><b>{item.inviter?.login}</b> invited you to the board <b>{item.board.title}</b></span>
          <div className={styles.controlButtons}>
            <div className={styles.accept} data-id={item.id} onClick={acceptInvite}>
              Accept
            </div>
            <div className={styles.decline} data-id={item.id} onClick={declineInvite}>
              Decline
            </div>
          </div>
        </div>
      })}
    </div>
  );

}

export default UserNotifications;