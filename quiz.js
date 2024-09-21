let question = document.getElementById("question");
let optionsDiv = document.getElementById("options");

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
let warningDisplay = document.getElementById("warningDisplay");

//*******************************************************************************
const urlParams = new URLSearchParams(window.location.search);
const questionKeyValue = urlParams.get("questionKey");
// console.log("questionKeyValue @@", questionKeyValue);
// console.log("type-of questionKeyValue ##", typeof questionKeyValue);

//******************************************************************************* */

// function quizStart() {
let questionsIndex = Number(questionKeyValue) || 0;
let totalScore = 0;
let time = 100;

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
  // let quesionsArrayLocalStorage = JSON.parse(localStorage.getItem("dataArray"));
  // if (questionsIndex <= quesionsArrayLocalStorage.length - 2) {
  //   questionsIndex = questionsIndex + 1;
  //   navigateQuestionFun(questionsIndex);
  // }
  console.log("next button clicked", questionsIndex);
  questionsIndex = questionsIndex + 1;
  navigateQuestionFun(questionsIndex);
}

function buttonClickedPrevious() {
  console.log("Previous button clicked", questionsIndex);
  questionsIndex = questionsIndex - 1;
  navigateQuestionFun(questionsIndex);
}

function buttonClickedSubmit() {
  let quesionsArrayLocalStorage = JSON.parse(localStorage.getItem("dataArray"));
  quesionsArrayLocalStorage.forEach((each) => {
    if (each.ans === each.attempted?.toString()) {
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
// }

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

  let flag = document.createElement("i");

  if (quesionsArrayLocalStorage[questionsIndex].flagged) {
    flag.setAttribute("class", "fa-regular fa-flag");
  } else {
    flag.setAttribute("class", "fa-solid fa-flag");
  }
  // flag.setAttribute("class", "fa-regular fa-flag large-icon");
  flag.onclick = (e) => flagButtonClicked(e, questionsIndex);

  question.appendChild(flag);
  //***************************************************************************
  quesionsArrayLocalStorage[questionsIndex].options.forEach((option, i) => {
    let div = document.createElement("div");
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", `options_${questionsIndex}`);
    input.setAttribute("value", `${option}`);
    input.setAttribute("id", `name_${option}`);

    quesionsArrayLocalStorage[questionsIndex].attempted === option &&
      (input.checked = true);

    input.onclick = (e) => buttonClickedAnswer(e, questionsIndex);
    div.appendChild(input);

    let label = document.createElement("label");
    label.textContent = `${option}`;
    label.setAttribute("for", `name_${option}`);
    div.appendChild(label);
    optionsDiv.appendChild(div);
  });
}

function buttonClickedAnswer(e, questionsIndex) {
  let quesionsArrayLocalStorage = JSON.parse(localStorage.getItem("dataArray"));
  quesionsArrayLocalStorage[questionsIndex].attempted = e.target.value;
  localStorage.setItem("dataArray", JSON.stringify(quesionsArrayLocalStorage));
}

function flagButtonClicked(e, questionsIndex) {
  let quesionsArrayLocalStorage = JSON.parse(localStorage.getItem("dataArray"));

  quesionsArrayLocalStorage[questionsIndex].flagged =
    !quesionsArrayLocalStorage[questionsIndex].flagged;

  localStorage.setItem("dataArray", JSON.stringify(quesionsArrayLocalStorage));
}

function dashboardPage() {
  document.location.href = "dashBoard.html";
}

dashboard.onclick = dashboardPage;

finalScoreDialogButtonClose.addEventListener("click", () => {
  finalScoreDialog.close();
  //   window.location.reload();
  document.location.href = "index.html";
});
