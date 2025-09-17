import { Children, useReducer,useEffect } from "react";
import { createContext,useContext } from "react";
import { toDosReducer } from "../reducers/ToDosReducer";


export const TasksContext = createContext(
   []
);

 

export  const TasksProvider=({children})=>{

   const [tasks,dispatch]=useReducer(toDosReducer,[])


   useEffect(()=>{
    dispatch({type:"get"});
 },[])

  useEffect(()=>{
 dispatch({type:"set"});
 },[tasks])
 

   return <TasksContext.Provider value={{tasks,dispatch}}>
     {children}
   </TasksContext.Provider>
}

export const useTasks=()=>{
   return useContext(TasksContext)
}
