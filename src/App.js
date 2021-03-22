import {Provider} from 'react-redux';
import store from './store/store';

import Trello from './components/Board/Board'

const App = () =>{
  return(
    <Provider store ={store}>
            <Trello />
    </Provider>
  )
}

export default App;
