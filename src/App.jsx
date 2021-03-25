import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import { getUser } from './store/ducks/user/user';

import styles from './App.module.scss';
import Header from './components/Header/Header';

const routes = (
  <Switch>
    <Route path={'/login'}>
      <Auth type={'login'} />
    </Route>
    <Route path={'/registration'}>
      <Auth type={'registration'} />
    </Route>
    <Route path={'/profile'}>
      <UserProfile />
    </Route>
    <Redirect to={'/'} />
  </Switch>
)

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token) {
      dispatch(getUser(token))
    } else {
      if (location.pathname !== '/login' && location.pathname !== '/registration') {
        history.replace('/login')
      }
    }
  }, [location])

  return (
    <div className={styles.App}>
      <Header />
      {routes}
    </div>
  );
}

export default App;
