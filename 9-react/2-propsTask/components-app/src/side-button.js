export default function SideButton({title,children}){
    return ( <button style={{
            backgroundColor:"#720f71",
            color:"#fff",
            border:"none",
            borderRadius:"6px",
            boxShadow:"4px 4px 15px rgba(0,0,0,0.3) ",
            width:"100px",
            padding:"7px 12px",
            margin:"8px",
           
        }}> {title}
       <div> {children}</div>
         </button>);
   
}