// import { quesionsArray } from "./data.js";

let questionListContainer = document.getElementById("questionListContainer");
questionListContainer.innerHTML = "";

let quesionsArrayLocalStorage = JSON.parse(localStorage.getItem("dataArray"));

quesionsArrayLocalStorage.forEach((each) => {
  let question = document.createElement("div");
  question.textContent = each.ques;
  question.setAttribute("class", "questionList");
  question.addEventListener("click", (e) => testingOnClick(e, each)); // Use addEventListener for better event handling
  questionListContainer.appendChild(question);
});

function testingOnClick(e, each) {
  console.log("Clicked inside dashboard question list", e, each);
}
