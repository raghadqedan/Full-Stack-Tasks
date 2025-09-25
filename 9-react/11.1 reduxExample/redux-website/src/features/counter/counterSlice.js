import { createSlice } from "@reduxjs/toolkit";


const initialValue={
    count:0
}
export const counterSlice=createSlice(
    {
       name:"counter",
       initialState:initialValue,
       reducers:{
        increment:(currentState,action)=>{
            currentState.count+=1;

        },
        decrement:(currentState,action)=>{
            if(currentState.count>0)
            currentState.count-=1;
        }
       } 
    }
)

export const {increment,decrement}=counterSlice.actions;
export default counterSlice.reducer;