quesionsArray = [
  {
    key: 1,
    ques: "Example of sementic HTML?",
    options: ["div", "span", "header", "img"],
    ans: "header",
    attempted: "santu",
  },
  {
    key: 2,
    ques: "difference javascript and react?",
    options: ["library", "tool", "langauge", "db"],
    ans: "library",
    attempted: undefined,
  },
  {
    key: 3,
    ques: "which database follow ACID property?",
    options: ["mySql", "mongoDB", "redis", "dynomoDB"],
    ans: "mySql",
    attempted: undefined,
  },
  {
    key: 4,
    ques: "Example Example Example?",
    options: ["div", "span", "header", "img"],
    ans: "header",
    attempted: undefined,
  },
  {
    key: 5,
    ques: "New question of javascript?",
    options: ["div", "span", "header", "img"],
    ans: "header",
    attempted: undefined,
  },
];

console.log("plain array ##", quesionsArray);

const stringifyData = JSON.stringify(quesionsArray);
console.log("stringifyData ##", stringifyData);

const parseData = JSON.parse(stringifyData);
console.log("parseData ##", parseData);
