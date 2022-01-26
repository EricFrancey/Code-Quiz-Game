// Start timer vars
let startButton = document.querySelector(".start-button");
let timerElement = document.querySelector(".timer-count");

let footer = document.querySelector(".footer");

//Question panels
let qEl1 = document.querySelector(".question1");
let qEl2 = document.querySelector(".question2");
let qEl3 = document.querySelector(".question3");

//Hiscores
let hiScores = document.querySelector(".hi-score");
let nameList = document.querySelector("#name-list");
let nameInput = document.querySelector("#nameText");
let names = [];

let endGame = document.querySelector(".end-game")

// Answer buttons
let option1a = document.querySelector(".option1a");
let option1b = document.querySelector(".option1b"); //// correct
let option1c = document.querySelector(".option1c");
let option1d = document.querySelector(".option1d");

let option2a = document.querySelector(".option2a");
let option2b = document.querySelector(".option2b");
let option2c = document.querySelector(".option2c"); // correct
let option2d = document.querySelector(".option2d");

let option3a = document.querySelector(".option3a");
let option3b = document.querySelector(".option3b");
let option3c = document.querySelector(".option3c");
let option3d = document.querySelector(".option3d"); // correct

let submitButton = document.getElementById("#submitButton");

//Timer
let timer;
let timerCount;
let score;


function init() {

  var storedNames = JSON.parse(localStorage.getItem("names"));
  
  if (storedNames !==null){
    names = storedNames;
  }
  renderhiScores()
  }

function startGame() {
    qEl1.setAttribute ("style", "display: block")
    timerCount = 20;
    startButton.disabled = true;
    startTimer()

}

startButton.addEventListener("click", startGame);
hiScores.addEventListener("click", showScores)

//correct answers
option1b.addEventListener("click", toNext1)
option2c.addEventListener("click", toNext2)
option3d.addEventListener("click", toEnd)

//incorrect answers
option1a.addEventListener("click", minusTime)

function showScores() {

    hiScores.setAttribute ("style", "display: block")


}

//Start timer
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      score = timerCount;
    if (timerCount <= 0) {
      clearInterval(timer);
      toEnd();
    }}
    , 1000);

    score = timerCount;
  }

 //Time penalty
function minusTime() {

  timerCount = timerCount-5;
// footer.style.backgroundColor = "red";
}


// Switching questions
function toNext1() {

  qEl1.setAttribute ("style", "display: none")
  qEl2.setAttribute ("style", "display: block")
  qEl3.setAttribute ("style", "display: none")
  endGame.setAttribute ("style", "display: none")

}
function toNext2() {

  qEl1.setAttribute ("style", "display: none")
  qEl2.setAttribute ("style", "display: none")
  qEl3.setAttribute ("style", "display: block")
  endGame.setAttribute ("style", "display: none")

}
function toEnd() {

  qEl1.setAttribute ("style", "display: none")
  qEl2.setAttribute ("style", "display: none")
  qEl3.setAttribute ("style", "display: none")

  endGame.setAttribute ("style", "display: block")

  clearInterval(timer);
  console.log(score);

}


//Storing hiscores
function renderhiScores() {

nameList.innerHTML = "Hi";

for (var i = 0; i < names.length; i++) {

  var name = names[i]

  var li = document.createElement("li");
  li.textContent = name;
  li.setAttribute("data-index", i);

  nameList.appendChild(li);
    }
}

function storeNames() {

localStorage.setItem("names", JSON.stringify(names));

}

submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  var nameText = nameInput.value.trim();
console.log(nameInput);

  if (nameText === "") {
    return;
  }

  names.push(nameText);
  nameInput.value = "";

  storeNames();
  renderhiScores();
});

init();
