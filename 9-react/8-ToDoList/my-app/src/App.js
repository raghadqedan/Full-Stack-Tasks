
import './App.css';
import ToDoList from './components/ToDoList';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import {TasksProvider} from './contexts/tasksContext';

import { ToastProvider } from './contexts/ToastContext';




function App() {
  
  const theme=createTheme({
  typography: {
   fontFamily:"Inter",
 fontWeight:"bold"

  },
  palette:{
    primary:{
        main:"#F52A6EFF"
    }
  
  }
});


  return (
    
    <ThemeProvider theme={theme}>
      <TasksProvider>
        <ToastProvider >
    <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"99vh",background:"linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%)"}}>
    <ToDoList/>
    </div>
    </ToastProvider>
    </TasksProvider>
    </ThemeProvider>
  );
}


export default App;
