const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: 2 },
    { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], correctAnswer: 0 },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "George Orwell", "J.K. Rowling"], correctAnswer: 0 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: 1 },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: 2 },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correctAnswer: 2 },
    { question: "In which year did World War II end?", options: ["1945", "1939", "1950", "1941"], correctAnswer: 0 },
    { question: "What is the currency of Japan?", options: ["Yuan", "Dollar", "Euro", "Yen"], correctAnswer: 3 },
    { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: 2 },
    { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: 2 },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsList = document.getElementById('options-list');
const feedbackElement = document.getElementById('feedback');
const timerElement = document.getElementById('timer');
const nextButton = document.getElementById('next-btn');

// Disable navigation while quiz is running
function disableNavigation(disable) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.toggle('disabled', disable);
        if (disable) {
            link.removeAttribute('href'); // Remove navigation ability
        } else {
            link.setAttribute('href', '#'); // Re-enable navigation
        }
    });
}

function startQuiz() {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('about').classList.add('hidden');
    quizContainer.classList.remove('hidden'); // Use quizContainer after defining it
    disableNavigation(true); // Disable navigation links
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    startTimer();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsList.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.onclick = () => selectAnswer(index);
        const li = document.createElement('li');
        li.appendChild(button);
        optionsList.appendChild(li);
    });
}

function selectAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedIndex === correctAnswer) {
        score++;
        feedbackElement.textContent = 'Correct!';
    } else {
        feedbackElement.textContent = 'Wrong!';
    }
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        feedbackElement.textContent = '';
        nextButton.disabled = true;
    } else {
        endQuiz();
    }
}

function startTimer() {
    timeLeft = 120;
    timerElement.textContent = `Time Left: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackElement.textContent = 'Time\'s up!';
            nextButton.disabled = false;
        }
    }, 1000);
}

function endQuiz() {
    quizContainer.classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    alert(`Quiz finished! Your score: ${score}`);
    disableNavigation(false); // Re-enable navigation after quiz ends
}

function goHome() {
    if (!document.querySelector('nav a').classList.contains('disabled')) {
        document.getElementById('about').classList.add('hidden');
        document.getElementById('home').classList.remove('hidden');
    }
}

function openAbout() {
    if (!document.querySelector('nav a').classList.contains('disabled')) {
        document.getElementById('home').classList.add('hidden');
        document.getElementById('about').classList.remove('hidden');
    }
}
