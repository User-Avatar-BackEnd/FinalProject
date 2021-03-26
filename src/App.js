import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import BoardsPanel from './components/BoardsPanel/BoardsPanel';
import Board from './components/Trello/Board/Board';
import {Provider} from 'react-redux';
import store from './store/store';
import styles from './App.module.scss';
import {PrivateRoute} from './helpers/PrivateRoute'

function App() {
  const routes = (
    <Switch>
      <Route path='/registration'>
        <Auth type={'registration'} />
      </Route>
      <PrivateRoute exact path='/board/:id' component ={Board} />
      <PrivateRoute exact path='/' component ={BoardsPanel} />
      <Route path='/login'>
        <Auth type={'login'} />
      </Route>
      
    </Switch>
  )

  return (
    <Provider store ={store}>
      <div className={styles.App}>
        {routes}
      </div>
    </Provider>
  );
}

export default App;
