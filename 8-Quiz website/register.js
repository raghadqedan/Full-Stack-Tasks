
 document.addEventListener('DOMContentLoaded', () => {
 const loginForm=document.querySelector('#login');
    const createAccountForm=document.querySelector('#createAccount');

function setFormMessage(formElement,type,message){
    const messageElement=formElement.querySelector('.form-message');
    messageElement.textContent=message;
    messageElement.classList.remove(`form_message-error`,`form_message-success`);
   
    messageElement.classList.add(`form_message-${type}`)

}
function cleanFormMessage(formElement){
    const messageElement=formElement.querySelector('.form-message');
    messageElement.classList.remove(`form_message-error`,`form_message-success`);

}

function setInputError(inputElement,message){
inputElement.classList.add('form_input-error');
inputElement.parentElement.querySelector('.form-input-error-message').textContent=message

}
function clearInputError(inputElement){
    inputElement.classList.remove('form_input-error');
    inputElement.parentElement.querySelector('.form-input-error-message').textContent = "";

}

//  Navigate between login and create  account form 
document.querySelector('#linkCreateAccount').addEventListener('click',(e)=>{
    
    e.preventDefault();
    document.querySelector('#login').classList.add('form--hidden');
    document.querySelector('#createAccount').classList.remove('form--hidden');
});
document.querySelector('#linkLogin').addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('#login').classList.remove('form--hidden');
    document.querySelector('#createAccount').classList.add('form--hidden');
});

//validation when login submit 
loginForm.addEventListener('submit',e=>{
    e.preventDefault();
    const emailElement=loginForm.querySelector('[type=email]');
    const passwordElement=loginForm.querySelector('[type=password]');
    const currentUserEmail=emailElement.value.trim();
    const currentUserPassword=passwordElement.value.trim();

    //validation data 
    const users=JSON.parse(localStorage.getItem("users"))||[];
  
   if(users.length>0){
const cuurentUser=users.find(user=>user.email===currentUserEmail);

if(cuurentUser!=null && cuurentUser.password===currentUserPassword){
        localStorage.setItem("loginUser",JSON.stringify(cuurentUser));
         setFormMessage(loginForm,"success","Login Successfully")
        Swal.fire({
        position: "top-end",
        icon: "success",
        title:`welcome ${cuurentUser.userName}`,
        showConfirmButton: false,
        timer: 2000,
        });
        
        setTimeout(() => {
        if(localStorage.getItem("selectedQuiz")){
            //If the user has already finished the test
        //     if(localStorage.getItem("quizCompleted")==true)
                window.location.href='quiz.html';
              //todo else the user start the quiz but for any reson he dont finish it restore the quizState(remaining time ,answers,currentIndex)
        }else
             window.location.href = "index.html";
}, 2000);
return ;

    }
}

//if data not valid 
      setFormMessage(loginForm,"error","Invalid userName / Password combination")
        Swal.fire({
  icon: "error",
  text: "Invalid userName/Password!",
  timer:1500,
showConfirmButton: false,
});


}),

// Live validation for Create Account
createAccountForm.querySelectorAll('.form-input').forEach(inputElement=>{
   inputElement.addEventListener('input',(e)=>{
      clearInputError(e.target);
      cleanFormMessage(createAccountForm);
      const value = e.target.value.trim();
      const inputName= e.target.name;

    if(inputName==="RegisterUsername" && !isValidUsername(value))
            setInputError(e.target,'username can not be empty');
    
     if(inputName === "RegisterEmailAddress" && !isValidEmailAddress(value))
            setInputError(e.target,'please enter valid email');

    if (inputName==="RegisterPassword" && !isValidPassword(value))
        setInputError(e.target, "Password must be at least 6 characters");
    if (inputName=== "RegisterConfirmPassword" && !confirmPassword(value)) 
                setInputError(e.target, "Passwords do not match");
   })
});

//validation when createAccount submit  
createAccountForm.addEventListener('submit',(e)=>{
    e.preventDefault();
   const usernameElement=createAccountForm.querySelector('[name=RegisterUsername]');
   const emailAddressElement=createAccountForm.querySelector('[name=RegisterEmailAddress]');
   const passwordElement=createAccountForm.querySelector('[name=RegisterPassword]');
   const confirmPasswordElement=createAccountForm.querySelector('[name=RegisterConfirmPassword]');
   const userName=usernameElement.value;
   const password=passwordElement.value;
   const email=emailAddressElement.value;
   const p=confirmPasswordElement.value;


   if(isValidUsername(userName)&& 
   isValidEmailAddress(email) && 
   isValidPassword(password) && 
   confirmPassword(p)){
saveData();

function saveData(){
    let users=JSON.parse(localStorage.getItem("users"))||[];
    if(users.some(user=>user.email===email)){
         return  setFormMessage(createAccountForm,"error","Invalid Email")
    }else{
        //add  anew user to local storage
        users.push({
            "userName":userName,
            "email":email,
            "password":password,
        }),
        console.log(users)
        localStorage.setItem("users",JSON.stringify(users));
        //  setFormMessage(createAccountForm,"success","Created Account  Successfully")
            
            Swal.fire({
            position: "top-end",
            icon: "success",
            title: "create Account Successfully",
            showConfirmButton: false,
            timer: 1500,
            });

            //    Swal.fire({
            //   title: "create Account Successfully",
            //   icon: "success",
            //   draggable: true,
            //   showConfirmButton:false,
            //   timer:2000,
            // });
            createAccountForm.classList.add('form--hidden');
            loginForm.classList.remove('form--hidden');
        }
    }
}else 
      setFormMessage(createAccountForm,"error","Invalid userName/Password combination")
});


function isValidUsername(value){
   return  value !== "";
}
function isValidEmailAddress(value){
   return  value !=="" && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.trim())
}
function isValidPassword(value){
   return   value.length>=6;
}
function confirmPassword(value){
     const password = document.querySelector("[name=RegisterPassword]").value;
     return value === password;
}
});


function handleCredentialResponse(response) {
    // JWT Token

 const data = jwt_decode(response.credential);
 if(data){
    let users=JSON.parse(localStorage.getItem("users"))||[];
    let currentUser=users.find((user)=>user.email===data.email);
    if(currentUser==null){
         //add  anew user to local storage
       currentUser={
            "userName":data.name,
            "email":data.email,
            "password":'',
        };
        users.push(currentUser),

        localStorage.setItem("users",JSON.stringify(users));
         
    }
         localStorage.setItem("loginUser",JSON.stringify(currentUser));
    
            
            Swal.fire({
            position: "top-end",
            icon: "success",
            title: "login  Successfully",
            showConfirmButton: false,
            timer: 1500,
            });
            //redirect the user to the quiz page if he selected aquiz else redirect user to the home page 
           setTimeout(() => {
        if(localStorage.getItem("selectedQuiz")){
                window.location.href='quiz.html';
              //todo else the user start the quiz but for any reson he dont finish it restore the quizState(remaining time ,answers,currentIndex)
        }else
             window.location.href = "index.html";
}, 2000);}

       

    }



      function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
        FB.login((function(response){
            statusChangeCallback
        }))
    }
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }

  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: 'name,email'}, function(user) {
          document.getElementById('status').innerHTML =
            "Welcome, " + user.name + ". Your email is " + user.email;
          localStorage.setItem('userName', user.name);
          localStorage.setItem('userEmail', user.email);
        });
  }


document.querySelector('#fb-button').addEventListener('click',()=>{
    checkLoginState();

});

//   function login(){
//     FB.login(function(response) {
//       if (response.status==='connected') {
//         FB.api('/me', {fields: 'name,email'}, function(user) {
//           document.getElementById('status').innerHTML =
//             "Welcome, " + user.name + ". Your email is " + user.email;
//           localStorage.setItem('userName', user.name);
//           localStorage.setItem('userEmail', user.email);
//         });
       
//       } else {
//         console.log('User cancelled login or did not fully authorize.');
//       }
//     }, {scope: 'public_profile,email'}); 
//   }
      




