// get variables to connect to html
var startScreen = document.querySelector(".start-screen");
var startBtn = document.querySelector(".start-quizbtn");
var initialsBtn = document.querySelector(".initials-submitbtn");
var goBackBtn = document.querySelector(".go-back");
var clearScoresBtn = document.querySelector(".clear-scores");
var questionBox = document.querySelector(".question-answer-box");
var optionsBox = document.querySelector(".options-box");
var userAnswerResult = document.querySelector(".after-answer-clicked");
var endScreen = document.querySelector(".end-screen-box");
var seeHighScores = document.querySelector(".see-previous-scores"); 
var timerCount = document.querySelector(".timer");
var highScores = document.querySelector(".high-score-box");
var userInitials = document.querySelector("#user-initials"); 
var scoreText = document.querySelector(".final-score"); 
var scoreList = document.querySelector("#past-scores");

// initializing variables
var questionCount = 0;
var time = 50;
var userScore = 0;

// my timer
function startTimer() {
    var counter = setInterval(function() {
        time--;
        timerCount.textContent = "Time: " + time;
        if(time <= 0) {
            questionEnd();
            clearInterval(counter);
        } 

    }, 1000)
}

// view past scores
seeHighScores.onclick = ()=> {
    highScores.classList.add("activeScores");
    startScreen.classList.add("hideStart");
}

// when start button is clicked question and timer will run
startBtn.onclick = ()=>{
    startScreen.classList.add("click-start"); // hides start screen
    questionBox.classList.add("activeQuestion"); // show question
    showQuestions(0); // runs function to show question
    startTimer(time); // starts timer
}

// shows and loops through the questions
function showQuestions(index) {
    var questionText = document.querySelector(".question");
    var displayQue = "<h1>" + questions[index].question + "</h1>";
    var displayOptions = "<div class='option'>" + questions[index].options[0] + "</div>"
                        +  "<div class='option'>" + questions[index].options[1] + "</div>"
                        + "<div class='option'>" + questions[index].options[2] + "</div>"
                        + "<div class='option'>" + questions[index].options[3] + "</div>";
    questionText.innerHTML = displayQue;
    optionsBox.innerHTML = displayOptions;
    var option = optionsBox.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// when an option is clicked the next question will be shown
optionsBox.onclick = ()=> {
    if(questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);
    } else{ // after questions are finished user score and enter initials will show
        questionEnd();
    }
   
}

// display wrong or correct when user clicks their answer 
function optionSelected(answer) {
    let userAns = answer.textContent;
    console.log(userAns);
    let correctAns = questions[questionCount].answer;
    if(userAns == correctAns) {
        userScore+=20;
        var userIsRight = "Correct!";
        var displayRight = "<hr>" + "<div class='result'>" + userIsRight + "</div>";
        userAnswerResult.innerHTML = displayRight;
        console.log("Answer is correct");
    }else {
        var userIsWrong = "Wrong!";
        var displayWrong = "<hr>" + "<div class='result'>" + userIsWrong + "</div>";
        userAnswerResult.innerHTML = displayWrong;
        console.log("Answer is wrong");
        time-=10;
    }
}

// after all questions are answered user score will be shown

function questionEnd() {
    endScreen.classList.add("activeEnd");
    questionBox.classList.remove("activeQuestion");
    var finalScore = "Your final score is " + userScore + ".";
    scoreText.innerHTML = finalScore;
}

// after user submits initials they will be taken to their previous high scores

initialsBtn.onclick = ()=> {
    highScores.classList.add("activeScores");
    endScreen.classList.remove("activeEnd");
    
    initials.push(userInitials.value);
    scores.push(userScore);
    userInitials.value = "";

    storeInitials();
    renderInitials();
}

// back to start screen
goBackBtn.onclick = ()=> {
    window.location.reload();
}

// clears past scores
clearScoresBtn.onclick = ()=> {
    localStorage.clear();
    scoreList.innerHTML = "";

}

// empty array to hold initials and scores
var initials = [];
var scores = [];

// loops through initials + scores and adds list items to previous scores
function renderInitials() {
    scoreList.innerHTML = "";

    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];
        score = userScore;
    }

    for (var i = 0; i < initials.length; i++) {
        var initial = initials[i];  
        var li = document.createElement("li");
        li.textContent = initial + " - " + scores;
        li.setAttribute("data-index", i);

        scoreList.appendChild(li);
    }
    }

// shows stored scores + initials
function init() {
    var storedInitials = JSON.parse(localStorage.getItem("initials"));
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedInitials !== null && storedScores !== null) {
        initials = storedInitials;
        scores = storedScores;
    };
      
    renderInitials();
}

// saves past scores + initials
function storeInitials() {
    localStorage.setItem("initials", JSON.stringify(initials));
    localStorage.setItem("scores", JSON.stringify(scores));

}

init();

// Making our questions
var questions = [
    {
        question: "Commonly used data types DO Not Include:",
        answer: "3. alerts",
        options: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers",
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        answer: "3. parenthesis",
        options: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets",
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store _________.",
        answer: "4. all of the above",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ]
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables",
        answer: "3. quotes",
        options: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parenthesis",
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: "4.console log",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console log",
        ]
    },
]

