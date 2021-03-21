import {Provider} from 'react-redux';
import store from './Trello/store/store';

import Trello from './Trello/Trello'

const App = () =>{
  return(
    <Provider store ={store}>
            <Trello />
    </Provider>
  )
}

export default App;
