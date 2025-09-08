import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { BlogsContext } from './contexts/BlogsContext';
export default function Blog(){
const blogs=useContext(BlogsContext);
    let blogsList=blogs.map((blog)=>{
     return <Link key={blog.id}
     to={`/Blog/${blog.id}`}><h1 style={{backgroundColor:"blue",padding:"20px",margin:"30px"}} key={blog.id}>{blog.title}</h1></Link>
    })
return <>{blogsList}</>
    
}