import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import API from '../../../config/API';
import useComponentVisible from '../../../hooks/useComponentVisible';

import styles from './HeaderNotifications.module.scss';

const HeaderNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect( () => {
    if (isComponentVisible) {
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
    } else {
      setNotifications([])
    }
  }, [isComponentVisible])

  const toggleList = () => {
    setIsComponentVisible(!isComponentVisible)
  }

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
    <div className={styles.HeaderNotifications} ref={ref}>
      <div className={styles.notificationsIcon} onClick={toggleList}>
        <FontAwesomeIcon icon={faBell}/>
      </div>
      {isComponentVisible &&
        <div className={styles.notificationsList}>
          {notifications.length === 0
            ? <h3>You have no notifications yet...</h3>
            : ''
          }
          {notifications.slice(0, 3).map(item => {
            return <div className={styles.notification} key={item.id}>
              <span>{item.inviter?.login} invited you to the board {item.board.title}</span>
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
          {notifications.length > 3
            ? <div className={styles.seeAllLink}>
              <Link
                to={{
                  pathname: '/profile',
                  state: {
                    page: 2
                  }
                }}
                onClick={toggleList}
              >
                See all invites
              </Link>
            </div>
            : ''
          }

        </div>
      }
    </div>
  )
}

export default HeaderNotifications;