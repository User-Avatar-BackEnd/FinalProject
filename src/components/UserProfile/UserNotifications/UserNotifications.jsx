import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoopCircleLoading } from 'react-loadingg';
import { useToasts } from 'react-toast-notifications';
import {getNotifications, notificationResponse} from '../../../store/ducks/user/user';
import selector from './UserNotifications.selector';

import styles from './UserNotifications.module.scss';
import UserIcon from '../../UserIcon/UserIcon';

const UserNotifications = () => {
  const { notifications, loading } = useSelector(selector)
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect( () => {
    dispatch(getNotifications(token))
  }, [])

  const acceptInvite = (e) => {
    dispatch(notificationResponse(1, e.target.getAttribute('data-id'), token, addToast))
  }

  const declineInvite = (e) => {
    dispatch(notificationResponse(-1, e.target.getAttribute('data-id'), token, addToast))
  }

  return (
    <div className={styles.UserNotifications}>
      {loading
        ? <LoopCircleLoading color={'orange'} style={{position: 'relative', margin: '200px auto'}}/>
        : <>
          {notifications.length === 0
            ? <div className={styles.placeholder}><h3>You have no notifications yet...</h3></div>
            : ''
          }
          {notifications.map(item => {
            return <div className={styles.notification} key={item.id}>
              <UserIcon type={'small'} rank={item.inviter?.rank}/>
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
          </>
      }
    </div>
  );

}

export default UserNotifications;