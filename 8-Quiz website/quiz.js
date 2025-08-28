

//Select Element 
const selectedQuiz=localStorage.getItem('selectedQuiz');
const countSpanElement=document.querySelector('.count');
const SpansElement=document.querySelector('.spans');
const questionTitle=document.querySelector('.question-title');
const answerAreaElement=document.querySelector('.answer-area');
const nextButtonElement=document.querySelector('.submit-button');
const quizContainer = document.querySelector('.quiz-app');
const countDownContainerElement = document.querySelector('.count-down');
const beepSound = document.getElementById("beep-sound");
const quizBodyElement = document.body;
const resultSoundElement = document.getElementById("Sound");






 let currentState=JSON.parse(localStorage.getItem(`questionState_${selectedQuiz}`))||{};
let currentIndex=parseInt(currentState['currentIndex'])||0;
let score=parseFloat(currentState['currentScore'])||0;
let questions;
let countInterval;
let duration =120;







function getQuestions(){
let request=new XMLHttpRequest();
request.onreadystatechange=function(){
    if(this.readyState==4 &&this.status==200){
        const data=JSON.parse(this.responseText);
         allCategoryQuestions=data[selectedQuiz];
         if(localStorage.getItem('quizCompleted')){
            questions=shuffledQuestions(allCategoryQuestions,10);
            localStorage.setItem("allQuestions",JSON.stringify(questions));

        }else{
            questions=JSON.parse(localStorage.getItem("allQuestions"))||allCategoryQuestions.slice(0,10);
            console.log(questions)
           
        
        }
        if(selectedQuiz){
            let questionCount=questions.length;
            createBullets(questionCount);
            countDown(duration,questionCount);
            createQuestion(questions[currentIndex],questionCount);
           
            
         nextButtonElement.addEventListener('click',()=>{
             if (!isSelectedOption() && duration>0 ) {
    alert('please select option');
    return;}
           
             
            //get the right answer of the current question
            const rightAnswer=questions[currentIndex].right_answer;
            //check the answer
            checkAnswer(rightAnswer);
            
             
           //if  reach to the last question show result
            if(currentIndex >=questionCount-1){
                showResult(questionCount);
                clearInterval(countInterval);
                 beepSound.pause();
                
                //if the user finish the quiz and click submit 
                localStorage.setItem("quizCompleted",true);
                 nextButtonElement.disabled = true; 
                return;
            }
             //Increase Index
               currentIndex++;
            //clear previous  dataQuestion 
            clearQuestionData();
            //  create new question 
               //handel the bullets
            handleBullets();
            createQuestion(questions[currentIndex],questionCount)
         

            // save the questionState
            localStorage.setItem(`questionState_${selectedQuiz}`,JSON.stringify({
                "currentIndex":currentIndex,
                "currentScore":score

            })
        );

         })
           








        }}

}
request.open("GET","question_file.json",true);
request.send();

}
getQuestions();

function clearBullets(){
    SpansElement.innerHTML='';
}
function createBullets(questionCount){
    for(let i=1;i<=questionCount;i++){
         //create new bullet
        let bullet=document.createElement('span');
        
          //check if this the first bullete make it  active
        if(i==1)
            bullet.classList.add("on")

         //append  bullete to the main bullete cointainer  
        SpansElement.appendChild(bullet);    
    }
}
function createQuestion(obj,questionCount){
      countSpanElement.innerHTML=`${currentIndex+1}/${questionCount}`;
   // set the category name 
   
   document.querySelector('.category-name').innerHTML=selectedQuiz

    //set the question title
    questionTitle.innerHTML=obj.question;

    //create the answer
    for(let i=1;i<=4;i++){
        //create new answer element 
        let answer=document.createElement('div');
        answer.classList.add('answer');
        //append answer div to the answer area 
        answerAreaElement.appendChild(answer);
        //create radioInput 
        let radioInput=document.createElement('input');
        // add type,id,name
        radioInput.id=`answer_${i}`;
        radioInput.type="radio";
        radioInput.name="question"
        radioInput.dataset.answer=`${obj[`answer_${i}`]}`;
        // //make firt option selected
        // if(i==1){
        //     radioInput.checked=true;
        // }
        //append input to the answer 
        answer.appendChild(radioInput);
      

        //create label 
        let label=document.createElement('label');
        //add for attribute 
        label.htmlFor=`answer_${i}`;
        //crete lable text
        let lableText=document.createTextNode(obj[`answer_${i}`])
        //append labelText to label
        label.appendChild(lableText);
       //append lable to the answer 
        answer.appendChild(label);
 
       //append answer element to the answerArea
           answerAreaElement.appendChild(answer);
    }


}

function checkAnswer(rightAnswer){
    let selectedAnswer;
    const radioInputElements=document.getElementsByName('question');
    for(let radioInput of radioInputElements){
         if(radioInput.checked){
            selectedAnswer=radioInput.dataset.answer;
            break;
         }
    }
    if(selectedAnswer==rightAnswer){
        score++;
    } 
let questionArray=JSON.parse(localStorage.getItem("questionData"))||[];
    let question={
        question: questions[currentIndex].question,
        answer:selectedAnswer,
        correct_answer:rightAnswer
    }
    questionArray.push(question);
    localStorage.setItem("questionData",JSON.stringify(questionArray))
}

function clearQuestionData(){
    //clear the question title
    questionTitle.innerHTML='';
    //clear the answers
    answerAreaElement.innerHTML='';
}
function isSelectedOption(){
    let optionSelected=false;
     const radioInputElements=document.getElementsByName('question');
    for(let radioInput of radioInputElements){
         if(radioInput.checked){
            optionSelected=true;
            break;
         }
    }
    return optionSelected;

}
function handleBullets(){
    const bulletSpans=document.querySelectorAll('.spans span');
    for(let i=0 ;i<=currentIndex;i++){
          bulletSpans[i].classList.add('on');
    
 }}
 function showResult(questionCount){
        localStorage.setItem("result",score);
        //check if the user pass the exam
        if(score>=questionCount/2 && score<=questionCount){
             resultSoundElement.src='/sounds/yay-6120.mp3';
             resultSoundElement.play();
            createResultPage("fa-solid fa-check ","Congratulations !<br> succeeded",score,questionCount,"#868B89CA","green"); 
             confetti({
     particleCount: 150,
     spread: 60,
     origin: { y: 0.6 }
   });

        }//if the user failed in the quiz 
        else if(score<questionCount/2 && score<=questionCount){
            resultSoundElement.src='/sounds/no-luck-too-bad-disappointing-sound-effect-112943.mp3';
             resultSoundElement.play();
               createResultPage("fa-solid fa-xmark", "Oops! Try again.", score, questionCount,"#868B89CA","#DC3C22");

        }
        

        
    

 }

 function  createResultPage(icon,text,score,questionCount,bcolor,secondaryColor){
   
    let resultOverlay=document.createElement('div');
    resultOverlay.classList.add('result-overlay');

    resultOverlay.innerHTML=`
    <div class="result"  style="background-color:${bcolor}" >
    <div class="result-container">
        <span class="icon" style="border:6px solid ${secondaryColor};" >
            <i class="${icon}" style="color:${secondaryColor};"> </i>
        </span>
        <p class="text">${text}</p>
        <div class="score-container">
            <span>score:<br></span><span class="score">${score}</span>/<span class="question-count">${questionCount}</span>
        </div>
        <div class="button-container">
            <button style=" background-color:${secondaryColor};" class="show-result">Show result</button>
            <button  style=" background-color:${secondaryColor};" class="back-home">Back To Home</button>
        </div>
        <div class="image-container">
            <img src="" alt="">

        </div>
    </div>
    </div>
    `

   
quizContainer.parentNode.insertBefore(resultOverlay, quizContainer); 

document.querySelector('.show-result').addEventListener('click',()=>{
   ShowResultTable(score,questionCount);
});
document.querySelector('.back-home').addEventListener('click',()=>{
     //clear the previous quiz data from the local storage 
    localStorage.removeItem('questionData');
    localStorage.removeItem('result');
    localStorage.removeItem('selectedQuiz'); 
    localStorage.removeItem('questionState');
        localStorage.removeItem(`questionState_${selectedQuiz}`);
    localStorage.removeItem('allQuestions');
    window.location.href='index.html';
    

})
 }

 function ShowResultTable(score,questionsCount){
    const resultData=JSON.parse(localStorage.getItem('questionData'))||[];
   
    
    //clear page 
 quizContainer.innerHTML='';
 document.querySelector('.result-overlay').remove();

  //create card 
const cardElement=document.createElement('div');
cardElement.classList.add('card');
cardElement.innerHTML=`
  <!-- الغلاف الأمامي (رح يفتح مثل دفتر) -->
  <div class="flip-card">
    <div class="flip-card__container">
      <div class="card-front">
        <div class="card-front__tp">
          <i class="card-front__icon fa-solid fa-file-pen"></i>
          <h2 class="card-front__heading">HTML </h2>
        </div>

        <div class="card-front__bt">
          <p class="card-front__text-view">
            View your score
          </p>
        </div>
      </div>
   
    </div>
  </div>

  <!-- الصفحة الداخلية -->
  <div class="inside-page">
    <div class="inside-page__container">
       <img src="${(score>=questionsCount/2)?"/img/pngtree-golden-trophy-.png":"/img/failed1.jpg"}" alt="" class="score-image">
        <p class="inside-page__text">${(score>=questionsCount/2)?'Congratulations':'Oops!'}</p>
       <h3 class="inside-page__heading">Score : ${score} / ${questionsCount}</h3>
     
     
    </div>
  </div>`

const tableContainer=document.createElement('div');
tableContainer.classList.add('table-container');
 
  //create table 
const resultTable=document.createElement('table');

//create the table header 
const tableHeader=document.createElement('tr');
tableHeader.innerHTML=`
 <th>#</th>
<th>Qestion</th>
<th>your Answer</th>
<th>correct Answer</th>`;
resultTable.appendChild(tableHeader);

//create the table content 
let counter=1;
resultData.forEach((question)=>{
    const row=document.createElement('tr');

      //create the question number cell
    const numberCell=document.createElement('td');
    numberCell.textContent=counter;
    row.appendChild(numberCell);

        //create ,add text, append question cell
    const questionCell=document.createElement('td');
    questionCell.textContent=question.question;
    row.appendChild(questionCell);
    //create ,add text, append your answer cell
     const yourAnswer=document.createElement('td');
     if(question.answer!=question.correct_answer)
       yourAnswer.classList.add('wrong');
   


    yourAnswer.textContent=question.answer;
    row.appendChild(yourAnswer);
     //create ,add text, append your correct nswer cell
     const correctAnswer=document.createElement('td');
    correctAnswer.textContent=question.correct_answer;
    correctAnswer.classList.add('correct');
    row.appendChild(correctAnswer);
    


    //append the current created  row to the table 
    resultTable.appendChild(row);
    counter++;
})

const buttonContainer=document.createElement('div');
buttonContainer.classList.add('button-Container');

const goToHomeButton=document.createElement('button');
goToHomeButton.textContent='Go To Home'
goToHomeButton.classList.add('table-button');
buttonContainer.appendChild(goToHomeButton)



tableContainer.appendChild(resultTable);
    //append the table to the quizcontainer 

    quizBodyElement.appendChild(cardElement)
quizContainer.appendChild(tableContainer);
quizContainer.appendChild(buttonContainer);

goToHomeButton.addEventListener('click',()=>{
     //clear the previous quiz data from the local storage 
    localStorage.removeItem('questionData');
    localStorage.removeItem('result');
    localStorage.removeItem('selectedQuiz'); 
        localStorage.removeItem(`questionState_${selectedQuiz}`);
    localStorage.removeItem('allQuestions');
   


    window.location.href='index.html';
    

})



}

// time handel
function countDown(duration, questionCount) {
    if (currentIndex < questionCount) {
        let minutes, secondes;
        countInterval = setInterval(function () {
            minutes = parseInt(duration / 60);
            secondes = parseInt(duration % 60);

            countDownContainerElement.innerHTML = 
                `${minutes < 10 ? `0${minutes}` : minutes}:${secondes < 10 ? `0${secondes}` : secondes}`;

            --duration;

            // warning + sound
         if (duration < 10 && duration >= 0) {
               beepSound.currentTime = 0;
               beepSound.play();
               countDownContainerElement.classList.remove('warning');
               void countDownContainerElement.offsetWidth; // إعادة تحميل
               countDownContainerElement.classList.add('warning');
         }
    


if (duration < 0) {
    clearInterval(countInterval);
    beepSound.pause();
    showResult(questionCount);
    localStorage.setItem("quizCompleted", true);
    nextButtonElement.disabled = true;
    return;
}

     }, 1000);
    }
}


function shuffledQuestions(questions,N){

    let randomIndex;
    for(let i=questions.length-1;i>=0;i--){
        randomIndex=Math.floor(Math.random()*(i+1));
        [questions[i],questions[randomIndex]]=[questions[randomIndex],questions[i]];
    }
    return questions.slice(0,N);

}

