import "./post.css";

export default function  Post({title,content}){
return(
    <div >
        <div class={"post-container"}>
    <p class={"post-title"}>{title}</p>
    <hr class={"hr-post"}></hr>
    <p class={"post-text"}>{content} </p>
   </div> 
    </div>
   
)

}