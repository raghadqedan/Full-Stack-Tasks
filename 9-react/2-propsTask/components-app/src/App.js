import logo from "./logo.svg";
import "./App.css";
import Header from "./header";
import Post from "./post";
import SideBar from "./side-bar";

function App() {
  //list rendering 
  const postsData=[
    {id:"1",title:"component 1",content:"this is the First componemt "},
    {id:"2",title:"component 2",content:"this is the second componemt "},
    {id:"3",title:"component 3",content:"this is the Third componemt "},
    {id:"4",title:"component 4",content:"this is the fourth componemt "},
  ]

  const createPosts=postsData.map(({id,title,content})=>(
          <Post  key={id} title={title} content={content}/>

  ))
  return (
    <div className="App">
      <Header />
    
            <div className={"body-container"}>
        <div >
         {createPosts}
        </div>
    <div> <SideBar /></div>
        
    
         
    
     </div>

    </div>
  );
}

export default App;
