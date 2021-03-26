import { combineReducers } from 'redux';
import user from './ducks/user/user';
import {reducerBoardsPanel} from './ducks/duckBoardsPanel';
import {reducerTrello} from './ducks/duckTrello';
import reducerTaskComments from "./ducks/duckComments";

export default combineReducers({
  user,
  panel: reducerBoardsPanel,
  trello: reducerTrello,
  taskComments: reducerTaskComments
})
