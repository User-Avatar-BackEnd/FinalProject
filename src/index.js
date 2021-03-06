import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { ToastProvider } from 'react-toast-notifications';
import rootReducer from './store/rootReducer';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ToastProvider autoDismiss={true} placement={'bottom-right'}>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));


