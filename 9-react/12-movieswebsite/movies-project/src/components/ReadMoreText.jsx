import { useState } from "react"
export default function ReadMoreText({text}){
    console.log(text)
const [isExpanded,setIsExpanded]=useState(false)
    return <>
    <p>
    {isExpanded?text:text?.slice(0,80)+"..."}
    </p>
    <button  className={" text-sm  text-amber-300  "} onClick={()=>{setIsExpanded(!isExpanded)}}>{isExpanded?"Read Less" : "Read More"}</button>
    
    </>
}