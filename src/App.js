import {Provider} from 'react-redux';
import store from './Trello/store/store';
import './App.css';
import React from "react";
import store from './store/store';

import Trello from './components/Board/Board'
import Trello from './Trello/Trello'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {CardDetailComponent} from "./components/CardDetailModal/CardDetailModal";
import {BoardsPanel} from "./components/BoardsPanel/BoardsPanel";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path={'/boards'} component={BoardsPanel}/>
                    <Route path={'/detail-modal'} component={CardDetailComponent}/>
                    <Route path={'/'} component={Trello}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
