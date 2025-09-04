import { useContext } from "react"
import UserContext from "./contexts/userContext";
export default function Dashboard(){
    let{user}=useContext(UserContext);

   return <div>
    <h2 style={{color:"#fff"}}>Welcome {user.name}</h2>
   </div>
}