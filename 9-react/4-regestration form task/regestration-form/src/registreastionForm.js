
import './registreationForm.css';
import Model from './model';
import {useState} from 'react'

export default function RegistreationForm(){
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

  function handelButtonClick(event){
    setErrorMessage("");
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    const {name,email,password,salaryRange}=RegestrastionInputs;
    event.preventDefault();
    
    if(name === ""){
        setErrorMessage("Please Enter name");
    }else if(email==="" || !emailRegex.test(email))
          setErrorMessage("Please Enter valid email");
         else if(password===""|| ! passwordRegex.test(password))
            setErrorMessage("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
        else if(salaryRange==="")
          setErrorMessage("Please Enter the expected salary");
               
    setModelVisible(true);

 
     
  }
    return (
      <div onClick={()=>modelVisible?setModelVisible(false):null} className="flex-container" style={{flexDirection:"column"}}>
        <form  style={{backgroundColor:"blue", width:"50%",color:"#fff",borderRadius:"10px",padding:"10px 20px",}}>
            <h2>Registration Form</h2>
            <hr></hr>
            <div className='input-container'>
                <label>Name</label>
                <input type="text" value={RegestrastionInputs.name} onChange={(event)=>{setRegestrationInputs({...RegestrastionInputs,name:event.target.value})}}/>
            </div>
              <div className='input-container'>
                <label>Email</label>
                <input type="email" value={RegestrastionInputs.email} onChange={(event)=>{setRegestrationInputs({...RegestrastionInputs,email:event.target.value})}}/>
            </div>
            <div className='input-container'>
                <label>password</label>
                <input type="password" value={RegestrastionInputs.password} onChange={(event)=>{setRegestrationInputs({...RegestrastionInputs,password:event.target.value})}}/>
            </div>
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