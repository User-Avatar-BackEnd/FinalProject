import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './components/Auth/Auth';

import styles from './App.module.scss';

function App() {
  const routes = (
    <Switch>
      <Route path='/login'>
        <Auth type={'login'} />
      </Route>
      <Route path='/registration'>
        <Auth type={'registration'} />
      </Route>
      <Redirect to={'/login'} />
    </Switch>
  )

  return (
    <div className={styles.App}>
      {routes}
    </div>
  );
}

export default App;
