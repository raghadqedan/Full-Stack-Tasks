 export default function InputComponent({inputName,inputType="text",value,handelInput}){
    return  <div className='input-container'>
                <label>{inputName}</label>
                <input type={inputType} value={value} onChange={(event)=>{handelInput(event.target.value)}}/>
            </div>
 }