import logo from './logo.svg';
import {use, useState} from 'react';
import './App.css';


let id=5;
function App() {
  const [inputValue,setInputValue]=useState("")
const [device,setDevice]=useState([
  {id:1,name:"Iphone"},
  {id:2,name:"Mak"},
  {id:3,name:"Samsung "},
  {id:4,name:"Windows"}
]);

function addToList(){
  setDevice([...device,{id:id,name:inputValue}]);
}
id++;

function deleteFromList(id){
const newDevice=device.filter((device)=>device.id !== id);
  setDevice(newDevice);

}
function editList(id){
  const newName=window.prompt("Enter the new name of device");
  if(newName){
   const newDevice= device.map((d)=>
       d.id===id ?{...d,name:newName}:d
    );
    setDevice(newDevice);
  };


}

const deviceList=device.map((device)=>{
  return <div key={device.id} style={{backgroundColor:"white",display:"flex",justifyContent:"space-between",padding:"10px 20px",alignItems:"center",margin:"10px",width:"500px",borderRadius:"4px"}} ><span>{device.name}</span><span ><i className="fa-solid fa-pen-to-square" style={{color: "#0929aa" ,marginRight:"20px"}}  onClick={()=>{editList(device.id)}}   ></i><i  className="fa-solid fa-trash" style={{color: "#d91717"}} onClick={()=>{deleteFromList(device.id)}}  ></i></span></div>
})



  return (
    <div  style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} className="App">
      <div style={{backgroundColor:"black",width:"600px",minHeight:"300px", padding:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",borderRadius:"4px"}}>
<div style={{marginBottom:"20px"}}>
  <input value={inputValue} onChange={(event)=>{setInputValue(event.target.value)}} style={{border:"2px solid gray",
      borderRadius:"4px",
      marginRight:"10px",
      height:"40px",
      width:"320px",
     }} type="text" />
     <button style={{
      borderRadius:"4px",
      height:"45px",
      width:"200px",
      backgroundColor:"#0929aa",
      color:"#fff",
      border:"none",
      cursor:"pointer",
      fontSize:"20px",
     }} onClick={addToList}  >add</button></div> 
 <div>
  {deviceList}
 </div>
      </div>
    




    </div>
  );
}

export default App;
