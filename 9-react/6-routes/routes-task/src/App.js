import logo from './logo.svg';
import './App.css';
import {Routes,Route,Link} from 'react-router-dom'
import { Home } from './Home';
import Blog from './Blogs';
import About from './About';
import BlogDetails from './BlogDetails';
import {BlogsContext} from './contexts/BlogsContext';
import NotFound from './NotFound';
import BlogsLayout from './BlogsLayout';
function App() {
  let blogs=[
    {
        id:1,
        title:"First Blog",
        body:"data about first blog "
    },
        {
        id:2,
        title:"Second Blog",
        body:"data about second blog "
    },
    {
        id:3,
        title:"Third Blog",
        body:"data about third blog "
    }
]
  return (
    <BlogsContext.Provider value={blogs}>
    <div className="App">
   <div >
    <ul style={{listStyleType:"none",display:"flex",gap:"30px",justifyContent:"center"}}>
    <Link to='/Home'> <li>Home</li></Link>
     <Link to='/About'> <li>About</li></Link>
        <Link to='/Blog'> <li>Blog</li></Link>
    </ul>
   </div>


<Routes>
  <Route path='/Home' element={<Home/>}/>
  <Route path='/About' element={<About/>}/>
 <Route path='/Blog' element={<BlogsLayout/>}>
  <Route index element={<Blog/>}></Route>
  <Route path=':blogId' element={<BlogDetails/>}/>
  </Route>
  <Route path='*' element={<NotFound/>}></Route>



</Routes>

    </div>
    </BlogsContext.Provider>
  );
}

export default App;
