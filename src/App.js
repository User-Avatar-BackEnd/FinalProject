import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import BoardsPanel from './components/BoardsPanel/BoardsPanel';
import Board from './components/Board/Board';
import {Provider} from 'react-redux';
import store from './store/store';

import styles from './App.module.scss';

function App() {
  const routes = (
    <Switch>
      <Route path='/registration'>
        <Auth type={'registration'} />
      </Route>
      <Route path='/board'>
        <Board />
      </Route>
      <Route path='/'>
        <BoardsPanel />
      </Route>
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
