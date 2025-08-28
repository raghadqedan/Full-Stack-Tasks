const messageInput=document.querySelector('#message');
const msgError=document.querySelector('.msg');
const commentElemnt=document.querySelector('.comment') 
let isSaved = false;
document.querySelector('#message').addEventListener('input',(e)=>{
    e.preventDefault()
   let userInput=messageInput.value;
    if(userInput ===''){
     msgError.textContent='Please Enter The Message Field';
     commentElemnt.textContent=''
      isSaved=false;
     setTimeout(()=>msgError.textContent='',3000);
     return;
    }
        if(!isSaved){
commentElemnt.textContent= userInput;
        }


    
    })
    document.querySelector('#btn').addEventListener('click',(e)=>{
    e.preventDefault()
   let userInput=messageInput.value;
    if(userInput ===''){
     msgError.textContent='Please Enter The Message Field';
     commentElemnt.textContent=''
     setTimeout(()=>msgError.remove(),3000)
    }else{
        commentElemnt.textContent= userInput;
   isSaved=true;

    }
    })
 
    