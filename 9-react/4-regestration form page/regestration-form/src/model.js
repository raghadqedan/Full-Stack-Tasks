import './registreationForm.css'

export default function Model({isvisible,errorMessage=null}){
  
    return isvisible ?(<div className="model-container">
        <div className='model' >
            
            <p style={{color:errorMessage?"red":"green"}}>{errorMessage?errorMessage:"The Form Has Been Submitted Sucessfuly"}</p>
        </div>
    </div>): <></>

}