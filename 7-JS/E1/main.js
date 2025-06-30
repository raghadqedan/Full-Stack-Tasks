const messageInput=document.querySelector('#message');
const msgError=document.querySelector('.msg');
const commentElemnt=document.querySelector('.comment') 
document.querySelector('#btn').addEventListener('click',(e)=>{
    e.preventDefault()
   let userInput=messageInput.value;
    if(userInput ===''){
     msgError.textContent='Please Enter The Message Field';
     commentElemnt.textContent=''
     setTimeout(()=>msgError.remove(),3000)
    }else{
commentElemnt.textContent= userInput;

    }
    })
 
    