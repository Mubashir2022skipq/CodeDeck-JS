const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language",
        ],
        correct: 0,
    },
    {
        question:
            "Which CSS property is used to control the spacing between elements?",
        options: ["margin", "padding", "spacing", "border-spacing"],
        correct: 1,
    },
    {
        question:
            "What is the JavaScript function used to select an HTML element by its id?",
        options: [
            "document.query",
            "getElementById",
            "selectElement",
            "findElementById",
        ],
        correct: 1,
    },
    {
        question:
            "In React.js, which hook is used to perform side effects in a function component?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 0,
    },
    {
        question: "Which HTML tag is used to create an ordered list?",
        options: ["<ul>", "<li>", "<ol>", "<dl>"],
        correct: 2,
    },
];


const answerElement = document.querySelectorAll(`.answer`);
const quiz = document.querySelector('.quiz');

const [questionElm, option_1, option_2, option_3, option_4] = document.querySelectorAll('#question,#option_1,#option_2,#option_3,#option_4');


const submitBtn = document.querySelector("#submit");

let currentQuizz = 0;
let score = 0;

const loadQuiz = () => {


    const { question, options } = quizData[currentQuizz];


    questionElm.innerText = `${currentQuizz + 1} : ${question}`


    options.forEach((currentOpt, index) => {
        window[`option_${index + 1}`].innerText = currentOpt;
    })


};


loadQuiz();


const getSelectedOption = () => {

    // let ans_Index;

    // answerElement.forEach((currentOption,index)=>{
    //       if(currentOption.checked)
    //     {
    //               ans_Index = index;
    //       }
    // })
    // return ans_Index


    let answerElt = Array.from(answerElement);

   


    return answerElt.findIndex((currentElm) => currentElm.checked);

}


const deselectedAnswer = () => {



    answerElement.forEach((currElm) => {
        currElm.checked = false;
    })

}



submitBtn.addEventListener('click', () => {

    
    const selectedOptionIndex = getSelectedOption();

     if (selectedOptionIndex === -1) {
        alert("Please select an option before submitting!");
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
        quiz.innerHTML = `
    <div class="result">
    <h2>🏆 Your Score: ${score}/${quizData.length} Correct Answers</h2>
    <p>Congratulations on completing the quiz! 🎉</p>
    <button class="reload-button" onclick="location.reload()">Play Again 🔄</button>
    </div>
  `;
    }
})
