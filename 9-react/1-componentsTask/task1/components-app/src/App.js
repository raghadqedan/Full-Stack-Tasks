import logo from './logo.svg';
import './App.css';
import Header from "./header"
import Post from "./post"
import SideBar from "./side-bar"


function App() {
  return (
    <div className="App">

      <Header/>
      <div className={"body-container"}>
           <div className={"posts-container"}>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
    </div>
<SideBar/>
      </div>
       



    </div>
  );
}

export default App;
