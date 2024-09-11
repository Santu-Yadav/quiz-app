// console.log(" document ## ", document);
import { quesionsArray } from "./data.js";

let startQuizBtn = document.querySelector("#startQuiz");
let landingScreenEl = document.querySelector("#starting-page");
let question = document.getElementById("question");
let optionsDiv = document.getElementById("options");
let questContainer = document.getElementById("questContainer");
let navigateQuiz = document.getElementById("navigateQuiz");
let submitButton = document.getElementById("submitButton");
let displayTotalScore = document.getElementById("displayTotalScore");
let timerDiv = document.querySelector("#timerDiv");
let timer = document.querySelector("#timer");

let previousButton = document.querySelector("#previousButton");
let nextButton = document.getElementById("nextButton");

let dashboard = document.querySelector("#dashboard");

let finalScoreDialog = document.getElementById("finalScoreDialog");
let finalScoreDialogButtonClose = document.getElementById(
  "finalScoreDialogButtonClose"
);

//******************************************************************************

localStorage.setItem("dataArray", JSON.stringify(quesionsArray));

let warningDisplay = document.getElementById("warningDisplay");

function quizStart() {
  //****************************************
  localStorage.setItem("myCat", "Tom");
  //****************************************
  let questionsIndex = 0;
  let totalScore = 0;
  let time = 10;
  landingScreenEl.setAttribute("class", "hide");

  // warningDisplay.setAttribute("class", "warningTime");
  const setIntervalId = setInterval(() => {
    time = time - 1;
    if (time < 4) {
      console.log("@@@ Inside time less then 4 @@@@");
      warningDisplay.setAttribute("class", "warningTime");
      warningDisplay.innerHTML = `${time} seconds left`;
    }

    if (time < 1) {
      warningDisplay.innerHTML = ``;
      warningDisplay.removeAttribute("class");
    }
    timer.innerText = time;
    if (time === 0) {
      clearInterval(setIntervalId);
      buttonClickedSubmit();
    }
  }, 1000);

  navigateQuestionFun(questionsIndex);

  navigateQuiz.removeAttribute("class");
  nextButton.onclick = buttonClickedNext;
  submitButton.onclick = buttonClickedSubmit;
  previousButton.onclick = buttonClickedPrevious;

  function buttonClickedNext(e) {
    let quesionsArrayLocalStorage = JSON.parse(
      localStorage.getItem("dataArray")
    );
    if (questionsIndex <= quesionsArrayLocalStorage.length - 2) {
      questionsIndex = questionsIndex + 1;
      navigateQuestionFun(questionsIndex);
    }
  }

  function buttonClickedPrevious() {
    console.log("Previous button clicked");
    questionsIndex = questionsIndex - 1;
    navigateQuestionFun(questionsIndex);
  }

  function buttonClickedSubmit() {
    let quesionsArrayLocalStorage = JSON.parse(
      localStorage.getItem("dataArray")
    );
    quesionsArrayLocalStorage.forEach((each) => {
      if (each.ans === each.attempted) {
        totalScore = totalScore + 1;
      }
    });

    displayTotalScore.setAttribute("class", "displayTotalScore");
    let scoreHTML = document.createElement("h2");
    scoreHTML.innerText = `Total Score : ${totalScore}`;
    displayTotalScore.appendChild(scoreHTML);
    finalScoreDialog.showModal();
    clearInterval(setIntervalId);
  }
}

function navigateQuestionFun(questionsIndex) {
  let quesionsArrayLocalStorage = JSON.parse(localStorage.getItem("dataArray"));

  questionsIndex == "0"
    ? previousButton.setAttribute("disabled", "true")
    : previousButton.removeAttribute("disabled");

  questionsIndex == quesionsArrayLocalStorage.length - 1
    ? nextButton.setAttribute("disabled", "true")
    : nextButton.removeAttribute("disabled");

  optionsDiv.innerHTML = "";

  question.innerHTML = quesionsArrayLocalStorage[questionsIndex].ques;
  quesionsArrayLocalStorage[questionsIndex].options.forEach((o, i) => {
    let button = document.createElement("button");
    button.textContent = `${i + 1}. ${o}`;
    button.setAttribute("value", o);
    button.onclick = (e) => buttonClickedAnswer(e, questionsIndex);
    optionsDiv.appendChild(button);
  });
}

function buttonClickedAnswer(e, questionsIndex) {
  let quesionsArrayLocalStorage = JSON.parse(localStorage.getItem("dataArray"));
  quesionsArrayLocalStorage[questionsIndex].attempted = e.target.value;
  localStorage.setItem("dataArray", JSON.stringify(quesionsArrayLocalStorage));
  console.log("quesionsArrayLocalStorage &&&&&&", quesionsArrayLocalStorage);
}

function dashboardPage() {
  document.location.href = "dashBoard.html";
}

startQuizBtn.onclick = quizStart;
dashboard.onclick = dashboardPage;

finalScoreDialogButtonClose.addEventListener("click", () => {
  finalScoreDialog.close();
  window.location.reload();
});
