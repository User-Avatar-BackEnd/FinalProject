import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from "redux-thunk";
import {reducerBoardsPanel} from './ducks/duckBoardsPanel';
import {reducerTrello} from './ducks/duckTrello';

const reducer = combineReducers({
    panel: reducerBoardsPanel,
    trello: reducerTrello
})

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

        }) : compose

const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;