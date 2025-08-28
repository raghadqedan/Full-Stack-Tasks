
const quizzesSectionElement=document.querySelector('.quizzes-section');
const readMoreElement=document.querySelector('.read-more');
const aboutTextElement=document.querySelector('.about-text  .text');



  const loginButton = document.querySelector('.loginButton');
  const logoutButton = document.querySelector('.logoutButton');

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  if (loginUser) {
    toggleButtons(logoutButton, loginButton);
    showWelcome();


  }
  else {
    toggleButtons(loginButton, logoutButton);
    hideWelcome();

   

  }

  function toggleButtons(visiableButton, nonVisiableButton) {
    nonVisiableButton.classList.add('hidden--Element');
    visiableButton.classList.remove('hidden--Element');
    
  }
  function showWelcome() {
    let welcomeElement = document.createElement('li');
    welcomeElement.classList.add('welcome-element')
    welcomeElement.innerHTML = `Welcome ${loginUser.userName}`;
    return document.querySelector('.main-nav').appendChild(welcomeElement);

  }
  function hideWelcome() {
    const element = document.querySelector('.welcome-element');
    if (element != null) {
      element.classList.add('hidden--Element');
    }
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      toggleButtons(loginButton, logoutButton);
      hideWelcome();
      localStorage.removeItem("loginUser");
      window.location.href="index.html";
    })
  }

  //handel the quizzes start buttons in Quizzes section 
for(const button of  quizzesSectionElement.getElementsByTagName('button') ){
  button.addEventListener('click',function(button){
    localStorage.setItem("quizCompleted",false);

    //add the selected quiz category  to the storage 
  localStorage.setItem("selectedQuiz",button.target.id);
  //confirm that the user logined to the system befor start the quiz 
  if(localStorage.getItem('loginUser'))
     window.location.href='quiz.html';
    else
       window.location.href='register.html';


  })


}

//handel the start-now button in landing 

document.querySelector('.start-now').addEventListener('click',()=>{
  if(localStorage.getItem("loginUser"))
   window.location.href = '#about-quizzes';
  else
   window.location.href= 'register.html';


  

})

readMoreElement.addEventListener('click',()=>{

  if(aboutTextElement.classList.contains('expanded')){
    aboutTextElement.classList.remove('expanded');
    readMoreElement.textContent='read more';
  }else{
    aboutTextElement.classList.add('expanded');
    readMoreElement.textContent='read less';

  }


})
/* -------------start yotube Api player code  -----------------*/
//to ensure load the youtube Api script only one time when load the page in the first time and prevent
//  reload it weh refresh the page 
// لمنع مشكلة عدم ظهور الفيديو عند عمل اعادة تحميل للصفحة 
if (!window.youtubeApiAdded) {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
  window.youtubeApiAdded = true;
}


let player;
  function onYouTubeIframeAPIReady() {
    //destroy the prev player befor create the new player 
     if(player){
      player.destroy();
     }
    console.log(window.innerWidth)

    player=new YT.Player('video-player', {
      videoId: 'pRcZnnHFeuQ', // Id video اللي بدنا نعرضه 
      playerVars: {
        autoplay: 0,       // 1 للتشغيل التلقائي، 0 للتشغيل اليدوي
        controls: 1        // عرض أزرار التحكم (تشغيل، إيقاف)
      },
    });
  }


const videoWrapper = document.querySelector("#video-player");

document.addEventListener("click", (e) => {
  if (videoWrapper.contains(e.target)) {
  
    videoWrapper.classList.toggle("expanded");
  } else {
   
    videoWrapper.classList.remove("expanded");
  }
});

/* ------------- End yotube Api player code  -----------------*/

/*---------------start revearin element when scroll and load- code -----*/
const revealSection=document.querySelectorAll('.reveal-section');
  function eventListener(){
revealSection.forEach((section)=>{
     const windowHeight=window.innerHeight;
  const sectionTopPosition=section.getBoundingClientRect().top;
  if(sectionTopPosition<windowHeight){
      section.classList.add('active');
      
      revealElements=section.querySelectorAll('.reveal');
      revealElements.forEach((element,index)=>{
        const delay=700 * index;
       if(section.classList.contains("about-section")){
                const leftAboutSectionElement= document.querySelector('.about-text');
         const rightAboutSectionElement= document.querySelector('.about-card');
         leftAboutSectionElement.classList.add('left-animation');
          rightAboutSectionElement.classList.add('right-animation');
   
      }else{
             setTimeout(()=>{element.classList.add('reaveal-active')},delay);
        }
      

      })
  }
})}
  //check if the current section display in the page or not 
  window.addEventListener('load',eventListener)
  window.addEventListener('scroll',eventListener)

  



/*---------------end revearin element when scroll and load- code -----*/



















