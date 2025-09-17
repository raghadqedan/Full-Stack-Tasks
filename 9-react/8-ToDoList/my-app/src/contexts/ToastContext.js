import { Children, createContext,useContext,useState } from "react";
import SnackBar from "../components/SnackBar";

const ToastContext=createContext({
    
});

export const  ToastProvider=({children})=>{
    // handle SnackBar 
     const [open, setOpen] = useState(false);
     const [icon, setIcon] = useState(true);

     //state to save the toast message 
     const [ToastMessage, setToastMessage] = useState("");
    
    
      function showToast(message,showIcon){
        setIcon(showIcon);
        setOpen(true);
        setTimeout(()=>{setOpen(false)},2000)
        setToastMessage(message)
      
      };
   return <ToastContext.Provider   value={{showToast}}>
                            {children}
                             <SnackBar open={open} message={ToastMessage} showIcon={icon}/>
   </ToastContext.Provider>

}
export const  useToast=()=>{
    return useContext(ToastContext)
}