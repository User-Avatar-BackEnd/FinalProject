import {Provider} from 'react-redux';
import store from './Trello/store/store';
import './App.css';
import React from "react";

import Trello from './components/Board/Board'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {CardDetailComponent} from "./components/CardDetailModal/CardDetailModal";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path={'/detail-modal'} component={CardDetailComponent}/>
                    <Route path={'/'} component={Trello}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
