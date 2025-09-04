
import './registreationForm.css';
import Model from './model';
import {useState} from 'react'
import InputComponent from './InputComponent';
import { useContext } from 'react';
import UserContext from './contexts/userContext';

export default function RegistreationForm(){

  const {handelUser}=useContext(UserContext);
    const [errorMessage,setErrorMessage]=useState("");
    const[modelVisible,setModelVisible]=useState(false);
  const [RegestrastionInputs,setRegestrationInputs]=useState({
      name:"",
      email:"",
      password:"",
      isEmployee:false,
      salaryRange:""

  });

  const disableButton= RegestrastionInputs.name===""||RegestrastionInputs.email===""||RegestrastionInputs.password===""||RegestrastionInputs.salaryRange==="";

  function handelName(name){
    setRegestrationInputs({...RegestrastionInputs,name:name})
  }
   function handelPassword(password){
    setRegestrationInputs({...RegestrastionInputs,password:password})
  }
     function handelEmail(email){
    setRegestrationInputs({...RegestrastionInputs,email:email})
  }
  function handelButtonClick(event){
    setErrorMessage("");
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let modelError="";
    const {name,email,password,salaryRange}=RegestrastionInputs;
    event.preventDefault();
    
    if(name === ""){
       modelError="Please Enter name"
    }else if(email==="" || !emailRegex.test(email))
          modelError="Please Enter valid email";
         else if(password===""|| ! passwordRegex.test(password))
            modelError="Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
        else if(salaryRange==="")
          modelError="Please Enter the expected salary";
         
        if(modelError){
          setErrorMessage(modelError);
           setModelVisible(true);
           return ;
        }
   
      handelUser(RegestrastionInputs);  
      setModelVisible(true);
    

  }
    return (
      <div onClick={()=>modelVisible?setModelVisible(false):null} className="flex-container" style={{flexDirection:"column"}}>
        <form  style={{backgroundColor:"blue", width:"50%",color:"#fff",borderRadius:"10px",padding:"10px 20px",}}>
            <h2>Registration Form</h2>
            <hr></hr>
            <InputComponent inputName="UserName" value={RegestrastionInputs.name} handelInput={handelName}  />
            <InputComponent inputName="Email" value={RegestrastionInputs.email} handelInput={handelEmail}  />
            <InputComponent inputName="Password" inputType="password" value={RegestrastionInputs.password} handelInput={handelPassword}  />

        
               <div >
                <label>Are you an employee?</label>
                <input  className='checkBox' type="checkbox" checked={RegestrastionInputs.isEmployee} onChange={(event)=>{setRegestrationInputs({...RegestrastionInputs,isEmployee:event.target.checked})}}/>
            </div>
             <div className='input-container'>
                <label>Expected Salary</label>
               <select className='input-container' value={RegestrastionInputs.salaryRange} onChange={(event)=>{setRegestrationInputs({...RegestrastionInputs,salaryRange:event.target.value})}}>
                <option>less than 1000$</option>
                <option>between 1000$ and 2000$ </option>
                <option>more than  2000$ </option>
               </select>
            </div>
            <button className={disableButton?"disabled":""} disabled={disableButton} onClick={handelButtonClick}>Submit</button>

        </form>
           <Model isvisible={modelVisible} errorMessage={errorMessage}/>
      </div>
    )
}