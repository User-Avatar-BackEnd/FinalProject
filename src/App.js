import {Header} from "./Header/Header";
import'./App.css'
import PROFILE from "./config";

const App = () =>{
  return(
      <Header profile={PROFILE}/>
  )
}

export default App;