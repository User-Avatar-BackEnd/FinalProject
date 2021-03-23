import {Provider} from 'react-redux';
import store from './Trello/store/store';

import Trello from './Trello/Trello'
import React from "react";
import {BoardsPanel} from "./components/BoardsPanel/BoardsPanel";

const App = () =>{
  return(
    <Provider store ={store}>
            <BoardsPanel />
    </Provider>
  )
}

export default App;
