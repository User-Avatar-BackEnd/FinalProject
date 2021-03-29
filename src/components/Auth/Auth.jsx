import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Login from './Login/Login';
import Registration from './Registration/Registration';

import styles from './Auth.module.scss';

const Auth = ({ type }) => {
  const history = useHistory()

  const token = localStorage.getItem('AUTH_TOKEN')

  useEffect(() => {
    if (token) {
      history.replace('/')
    }
  })

  const onLogin = (token) => {
    localStorage.setItem('AUTH_TOKEN', token)
    history.push('/')
  }

  return (
    <div className={styles.Auth}>
      {type === 'login'
        ? <Login onLogin={onLogin} />
        : <Registration onLogin={onLogin} />
      }
    </div>
  );

}

export default Auth;