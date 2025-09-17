
import './App.css';
import ToDoList from './components/ToDoList';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import {TasksProvider} from './contexts/tasksContext';
import { useEffect,useReducer } from 'react';
import { ToastProvider } from './contexts/ToastContext';
import { toDosReducer } from './reducers/ToDosReducer';



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


//  const[task,setTask]= useState(()=>(JSON.parse(localStorage.getItem("todotasks")) ||[]));
 const[tasks,dispatch]= useReducer(toDosReducer,[]);

 useEffect(()=>{
    dispatch({type:"get"});
 },[])

  useEffect(()=>{
 dispatch({type:"set"});
 },[tasks])
 
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
