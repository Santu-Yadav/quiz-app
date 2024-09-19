import { quesionsArray } from "./data.js";

let startQuizBtn = document.querySelector("#startQuiz");

localStorage.setItem("dataArray", JSON.stringify(quesionsArray));

function quizStart01() {
  document.location.href = "./quizPage.html";
}

startQuizBtn.onclick = quizStart01;
