// import { quesionsArray } from "./data.js";

let gotoQuizButton = document.getElementById("gotoQuizButton");
gotoQuizButton.onclick = gotoButtonFunc;

let questionListContainer = document.getElementById("questionListContainer");
questionListContainer.innerHTML = "";

let quesionsArrayLocalStorage = JSON.parse(localStorage.getItem("dataArray"));
console.log(
  "quesionsArrayLocalStorage # dashboaard @@",
  quesionsArrayLocalStorage
);

quesionsArrayLocalStorage.forEach((each) => {
  let question = document.createElement("div");
  question.textContent = each.ques;
  question.setAttribute("class", "questionList");
  question.addEventListener("click", (e) => dashboardQuesOnClick(e, each)); // Use addEventListener for better event handling
  questionListContainer.appendChild(question);
});

function dashboardQuesOnClick(e, each) {
  console.log("Clicked inside dashboard question list", e, each);
  document.location.href = `quizPage.html?questionKey=${each.key}`;
}

function gotoButtonFunc() {
  document.location.href = "quizPage.html";
}
