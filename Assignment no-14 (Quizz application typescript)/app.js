//Define the types :
//Quizz data :
var quizData = [
    {
        question: "What will be the output of: console.log([] + []);",
        options: ["[]", "0", "undefined", '"" (empty string)'],
        correct: 3,
    },
    {
        question: "What is the result of typeof NaN?",
        options: ["NaN", "number", "undefined", "object"],
        correct: 1,
    },
    {
        question: "Which of the following is a falsy value in JavaScript?",
        options: ["[]", "{}", "0", "\"false\""],
        correct: 2,
    },
    {
        question: "What will be the output of: console.log(0.1 + 0.2 === 0.3);",
        options: ["true", "false", "undefined", "NaN"],
        correct: 1,
    },
    {
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["String", "Symbol", "Object", "Boolean"],
        correct: 2,
    },
    {
        question: "How is 'null' treated when using the typeof operator?",
        options: ["null", "object", "undefined", "NaN"],
        correct: 1,
    },
    {
        question: "What will be the output of: console.log(typeof typeof 1);",
        options: ["string", "number", "object", "undefined"],
        correct: 0,
    },
    {
        question: "What will this return? Boolean([]);",
        options: ["true", "false", "undefined", "throws error"],
        correct: 0,
    },
    {
        question: "What does this evaluate to? [] == ![]",
        options: ["true", "false", "throws error", "undefined"],
        correct: 0,
    },
    {
        question: "What will be the result of: +true + true?",
        options: ["2", "true", "NaN", "1"],
        correct: 0,
    },
    {
        question: "What is the output of: console.log(1 < 2 < 3);",
        options: ["true", "false", "undefined", "NaN"],
        correct: 0,
    },
    {
        question: "What is the output of: console.log(3 > 2 > 1);",
        options: ["true", "false", "undefined", "NaN"],
        correct: 1,
    },
    {
        question: "What is a closure in JavaScript?",
        options: [
            "A function having access to the parent scope, even after the parent function has closed",
            "A function that is immediately invoked",
            "A function inside a loop",
            "A block scoped variable",
        ],
        correct: 0,
    },
    {
        question: "What will be the value of 'this' inside a regular function (non-arrow) in strict mode?",
        options: ["window", "undefined", "function itself", "global"],
        correct: 1,
    },
    {
        question: "What does the 'void' operator do in JavaScript?",
        options: [
            "Deletes a variable",
            "Returns undefined",
            "Creates empty scope",
            "Stops function execution",
        ],
        correct: 1,
    },
    {
        question: "Which method prevents object properties from being added or removed?",
        options: ["Object.freeze()", "Object.seal()", "Object.preventExtensions()", "All of the above"],
        correct: 3,
    },
    {
        question: "What is the output of: console.log([1, 2] + [3, 4]);",
        options: ["[1,2,3,4]", '"1,23,4"', '"1,23,4"', '"1,23,4"'],
        correct: 1,
    },
    {
        question: "What is the result of: 1 + '1' - 1?",
        options: ["1", "10", "11", "NaN"],
        correct: 0,
    },
    {
        question: "Which of the following is true about arrow functions?",
        options: [
            "They do not bind their own 'this'",
            "They can be used as constructors",
            "They support 'arguments' object",
            "They are slower than regular functions",
        ],
        correct: 0,
    },
    {
        question: "Which method can deep freeze an object including nested objects?",
        options: [
            "Object.freezeDeep()",
            "Object.freeze()",
            "Manually using recursion with Object.freeze()",
            "Object.deepFreezeAll()",
        ],
        correct: 2,
    },
];
// DOM Element.
var answerElement = document.querySelectorAll('.answer');
var quiz = document.querySelector('.quiz');
// const [questionElm, option_1,option_2,option_3,option_4] = Array.from(
//     document.querySelectorAll(`#question, option_1, option_2, option_3, option_4`)
// ) as HTMLElement[];
// const [questionElm, option_1, option_2, option_3, option_4] = Array.prototype.slice.call(
//     document.querySelectorAll(`#question, option_1, option_2, option_3, option_4`)
// ) as HTMLElement[];
var questionElm = document.getElementById('question');
var optionsElms = [
    document.getElementById('option_1'),
    document.getElementById('option_2'),
    document.getElementById('option_3'),
    document.getElementById('option_4'),
];
if (!questionElm || optionsElms.some(function (el) { return el === null; })) {
    throw new Error("Missing DOM elements");
}
//Button.
var submitBtn = document.querySelector('#submit');
var currentQuizz = 0;
var score = 0;
//load quizz question and option.
var loadQuiz = function () {
    // const { question, options } = quizData[currentQuizz]!;
    // const currentItem = quizData[currentQuizz];
    // if(!currentItem) return;
    // const {question,options} = currentItem;
    // questionElm.innerText = `${currentQuizz+1} : ${question}`;
    //  [option_1, option_2, option_3, option_4].forEach((optEl, index)=>{
    //     optEl.innerText=options[index];
    // });
    var _a = quizData[currentQuizz], question = _a.question, options = _a.options;
    questionElm.innerText = "".concat(currentQuizz + 1, ": ").concat(question);
    optionsElms.forEach(function (optEl, i) {
        if (optEl) {
            optEl.innerText = options[i];
        }
    });
};
//Get selected option index.
var getSelectedOption = function () {
    // const answerElt = Array.from(answerElement);
    var answerElt = Array.prototype.slice.call(answerElement);
    return answerElt.findIndex(function (currentElm) { return currentElm.checked; });
};
//Deselect options.
var deselectedAnswer = function () {
    answerElement.forEach(function (currentElm) {
        currentElm.checked = false;
    });
};
//Submit click event.
submitBtn.addEventListener('click', function () {
    var selectedOptionIndex = getSelectedOption();
    if (selectedOptionIndex === -1) {
        alert("Please select an option before submitting");
        return;
    }
    if (selectedOptionIndex === quizData[currentQuizz].correct) {
        score += 1;
    }
    currentQuizz++;
    if (currentQuizz < quizData.length) {
        deselectedAnswer();
        loadQuiz();
    }
    else {
        quiz.innerHTML = "\n            <div class=\"result\">\n                <h2>\uD83C\uDFC6 Your Score: ".concat(score, "/").concat(quizData.length, " Correct Answers</h2>\n                <p>Congratulations on completing the quiz! \uD83C\uDF89</p>\n                <button class=\"reload-button\" onclick=\"location.reload()\">Play Again \uD83D\uDD04</button>\n            </div>\n        ");
    }
});
loadQuiz();
