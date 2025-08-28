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
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
    <div> <SideBar /></div>
        
    
         
    
     </div>

    </div>
  );
}

export default App;
