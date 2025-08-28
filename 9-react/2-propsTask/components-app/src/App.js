import logo from "./logo.svg";
import "./App.css";
import Header from "./header";
import Post from "./post";
import SideBar from "./side-bar";

function App() {
  return (
    <div className="App">
      <Header />
    
            <div className={"body-container"}>
        <div >
          <Post title="component 1" content="this is the First componemt "/>
          <Post title="component 2" content="this is the second componemt"/>
          <Post title="component 2" content="this is the third componemt "/>
          <Post title="component 4" content="this is the fourth componemt "/>

        </div>
    <div> <SideBar /></div>
        
    
         
    
     </div>

    </div>
  );
}

export default App;
