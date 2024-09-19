const startBtn = document.getElementById('startBtn');
const landingPage = document.getElementById('landingPage');
const quizPage = document.getElementById('quizPage');
const questionElement = document.getElementById('question');
const choices = document.querySelectorAll('.choice-text');
const choicesDivs = document.querySelectorAll('.choice-container');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Array of questions
const questions = [
    {
        question: "What is the capital of France?",
        choice1: "Paris",
        choice2: "London",
        choice3: "Rome",
        choice4: "Berlin",
        answer: 1,
    },
    {
        question: "Which planet is known as the Red Planet?",
        choice1: "Earth",
        choice2: "Mars",
        choice3: "Jupiter",
        choice4: "Saturn",
        answer: 2,
    },
    {
        question: "Who wrote 'Hamlet'?",
        choice1: "Charles Dickens",
        choice2: "J.K. Rowling",
        choice3: "William Shakespeare",
        choice4: "Mark Twain",
        answer: 3,
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        choice1: "Gold",
        choice2: "Oxygen",
        choice3: "Osmium",
        choice4: "Oganesson",
        answer: 2,
    },
    {
        question: "What is the largest mammal in the world?",
        choice1: "Elephant",
        choice2: "Blue Whale",
        choice3: "Giraffe",
        choice4: "Hippopotamus",
        answer: 2,
    },
    {
        question: "In which year did World War II end?",
        choice1: "1942",
        choice2: "1945",
        choice3: "1948",
        choice4: "1950",
        answer: 2,
    },
    {
        question: "What is the smallest prime number?",
        choice1: "0",
        choice2: "1",
        choice3: "2",
        choice4: "3",
        answer: 3,
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        choice1: "China",
        choice2: "South Korea",
        choice3: "Thailand",
        choice4: "Japan",
        answer: 4,
    },
    {
        question: "What is the hardest natural substance on Earth?",
        choice1: "Gold",
        choice2: "Diamond",
        choice3: "Iron",
        choice4: "Quartz",
        answer: 2,
    },
    {
        question: "Which planet is closest to the sun?",
        choice1: "Venus",
        choice2: "Earth",
        choice3: "Mercury",
        choice4: "Mars",
        answer: 3,
    },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = questions.length;

// Start the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    landingPage.classList.add('slide-up');

    quizPage.classList.remove('d-none'); // Show quiz page
    getNewQuestion();
};

// Get new question
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return showScore();
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion[`choice${number}`];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

// console.log("hello world")
// Answer selection

choicesDivs.forEach((choiceD) => {
    // console.log(choice.textContent)

    choiceD.addEventListener('click', () => {
        // console.log('hello');
        console.log('clicked')
        if (!acceptingAnswers) return;
        const choce = choiceD.querySelector('.choice-text');
        if (choce == undefined) {
            return;
        }
        // console.log(choce);
        acceptingAnswers = false;
        const selectedChoice = choce
        const selectedAnswer = selectedChoice.dataset.number;

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.classList.add(classToApply);

        if (classToApply === 'correct') {
            score += SCORE_POINTS;
            scoreText.innerText = score;
        }

        selectedChoice.classList.remove(classToApply);
        getNewQuestion();
        // setTimeout(() => {

        // }, 1000);
    });
});

// Show score after quiz completion
showScore = () => {
    quizPage.innerHTML = `
        <h2 class="fade-in" style="font-size: 2.5rem; color: #4CAF50;">Congratulations!</h2>
        <p class="fade-in" style="font-size: 1.5rem; margin-top: 20px;">Your final score is:</p>
        <h1 class="fade-in" style="font-size: 4rem; color: #f35626;">${score}</h1>
        <button class="btn btn-lg btn-primary mt-4" onclick="startGame()">Play Again</button>
    `;
};

// Event listener for the start button
startBtn.addEventListener('click', startGame);
