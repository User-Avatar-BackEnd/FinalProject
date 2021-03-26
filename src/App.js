import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import {clearUser, getUser} from './store/ducks/user/user';
import Header from './components/Header/Header';
import {PrivateRoute} from './helpers/PrivateRoute';
import Board from './components/Trello/Board/Board';
import BoardsPanel from './components/BoardsPanel/BoardsPanel';

import styles from './App.module.scss';

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
    <PrivateRoute exact path='/' component ={BoardsPanel} />
    <PrivateRoute exact path='/board/:id' component ={Board} />
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
      dispatch(clearUser())
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
