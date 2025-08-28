import SideButton from "./side-button" ;
export default function SideBar(){
    return(
    <div style={{
        width:"250px",
        padding:"10px 30px",
        border:"3px solid #357876",
        margin:"20px",
        height:"330px"



    }}>  
        <div >
      {Array.from({ length: 13 }).map(() => (
        <SideButton />
      ))}
        </div>
        </div>
    );
}