import { Outlet } from "react-router"
export default function BlogsLayout(){
    return (
        <>
        <div style={{backgroundColor:"blue",margin:"20px",height:"80px",paddingTop:"40px",fontSize:"30px",color:"white"}}> Posts</div>
        
        <Outlet/>
        
        
        </>
    )
}