import { combineReducers } from 'redux';
import user from './ducks/user/user';
import {reducerBoardsPanel} from './ducks/duckBoardsPanel';
import {reducerTrello} from './ducks/duckTrello';

export default combineReducers({
  user,
  panel: reducerBoardsPanel,
  trello: reducerTrello
})