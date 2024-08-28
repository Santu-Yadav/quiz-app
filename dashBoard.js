import { quesionsArray } from "./data.js";

let questionListContainer = document.getElementById("questionListContainer");
questionListContainer.innerHTML = "";

quesionsArray.forEach((each) => {
  let question = document.createElement("div");
  question.textContent = each.ques;
  question.setAttribute("class", "questionList");
  question.addEventListener("click", testingOnClick); // Use addEventListener for better event handling
  questionListContainer.appendChild(question);
});

function testingOnClick() {
  console.log("Clicked inside dashboard question list");
}
