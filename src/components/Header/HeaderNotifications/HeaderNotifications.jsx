import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { LoopCircleLoading } from 'react-loadingg';
import { useToasts } from 'react-toast-notifications';
import { getNotifications, notificationResponse } from '../../../store/ducks/user/user';
import useComponentVisible from '../../../hooks/useComponentVisible';
import selector from './HeaderNotifications.selector';

import styles from './HeaderNotifications.module.scss';

const HeaderNotifications = () => {
  const { notifications, loading } = useSelector(selector)
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect( () => {
    if (isComponentVisible) {
      dispatch(getNotifications(token))
    }
  }, [isComponentVisible])

  const toggleList = () => {
    setIsComponentVisible(!isComponentVisible)
  }

  const acceptInvite = (e) => {
    dispatch(notificationResponse(1, e.target.getAttribute('data-id'), token, addToast))
  }

  const declineInvite = (e) => {
    dispatch(notificationResponse(-1, e.target.getAttribute('data-id'), token, addToast))
  }


  return (
    <div className={styles.HeaderNotifications} ref={ref}>
      <div className={styles.notificationsIcon} onClick={toggleList}>
        <FontAwesomeIcon icon={faBell}/>
      </div>
      {isComponentVisible &&
        <div className={styles.notificationsList}>
          {loading
            ? <LoopCircleLoading color={'orange'} style={{position: 'relative', margin: '70px auto'}}/>
            : <>
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
              </>
          }
        </div>
      }
    </div>
  )
}

export default HeaderNotifications;