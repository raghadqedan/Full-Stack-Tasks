
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function SnackBar({open,message,showIcon=true}) {
 


  return (
    <div>
      <Snackbar
        open={open}
          autoHideDuration={1000} 
        
    
        
      >

         <Alert
          severity="success"
          variant="filled"
         icon={showIcon?undefined:false}
          sx={{ width: '100%',background: "linear-gradient(#AB47BC, #E91E63)", }}
        >
         {message}
        </Alert>
        </Snackbar>
    </div>
  );
}