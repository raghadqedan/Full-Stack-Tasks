import { useParams } from "react-router-dom";
import { useContext } from "react";
import { BlogsContext } from "./contexts/BlogsContext";
export default function BlogDetails(){
    const {blogId}=useParams();
    
    const blogList=useContext(BlogsContext);
   const blog= blogList.find((blog)=>{return blog.id=== parseInt(blogId)});
     return blog?(<div >
        <h1>{blog.title}</h1>
        <p>{blog.body}</p>
    </div>):(<div> Post with id : {blogId} is not exist</div>)

}