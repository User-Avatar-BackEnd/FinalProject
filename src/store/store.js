import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from "redux-thunk";
import {reducerBoardsPanel} from'../ducks/duckBoardsPanel';
import {reducerTrello} from'../ducks/duckTrello';
import reducerTaskComments from "../ducks/duckComments";
import {reducerBoardsPanel} from './ducks/duckBoardsPanel';
import {reducerTrello} from './ducks/duckTrello';

const reducer = combineReducers({
    panel: reducerBoardsPanel,
    trello: reducerTrello,
    taskComments: reducerTaskComments
})

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

        }) : compose

const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
