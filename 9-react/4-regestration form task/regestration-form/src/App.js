import logo from './logo.svg';
import './App.css';
import RegistreationForm from './registreastionForm'
import {useState} from 'react'
import Dashboard  from './Dashboard';
import UserContext from './contexts/userContext'

let userId=1;
function App() {
   const[user,setUser]=useState({
    id:userId,
    name:"",
    email:"",
    password:"",
    isEmployee:false,
    salaryRange:""
   })


   function handelAddUser(userData){
     setUser({id:userId,...userData});
         userId++;
   }
  return(
    
    <div className="App" style={{marginTop:"100px"}}>
      <UserContext.Provider value={{user:user,handelUser:handelAddUser}} >
          {user.name!==""?<Dashboard  />:<RegistreationForm  />}
      </UserContext.Provider>
    
     
    </div>
  );
}

export default App;
