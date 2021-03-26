import './App.css';
import {Rating} from './components/Rating/rating'
import RATING from "./components/Rating/config";

function App() {
  return (
    <div className="App">
      <Rating rating={RATING}/>
    </div>
  );
}

export default App;
