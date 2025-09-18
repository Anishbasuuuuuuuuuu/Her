// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Floating Hearts Animation
function createHeart() {
    const hearts = ['💖', '💕', '💝', '💗', '💓', '💞', '💘', '🌹', '💐', '🌸'];
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
    document.getElementById('hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Create more hearts more frequently
setInterval(createHeart, 800);

// Create bursts of hearts occasionally
setInterval(() => {
    for(let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
    }
}, 15000);

// Memory Game
const memorySymbols = ['💕', '💖', '💝', '🌹', '💐', '🎀', '💍', '🌟'];
let memoryCards = [];
let flippedCards = [];
let memoryScore = 0;
let memoryMoves = 0;

function initMemoryGame() {
    const gameBoard = document.getElementById('memory-board');
    const symbols = [...memorySymbols, ...memorySymbols];
    symbols.sort(() => Math.random() - 0.5);
    
    gameBoard.innerHTML = '';
    memoryCards = [];
    
    symbols.forEach((symbol, index) => {
        const card = document.createElement('button');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerHTML = '💝';
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
        memoryCards.push(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerHTML = card.dataset.symbol;
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            memoryMoves++;
            document.getElementById('memory-moves').textContent = memoryMoves;
            
            setTimeout(() => {
                if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                    memoryScore++;
                    document.getElementById('memory-score').textContent = memoryScore;
                    flippedCards = [];
                    
                    if (memoryScore === 8) {
                        setTimeout(() => {
                            alert(`Congratulations! You completed the game in ${memoryMoves} moves! 🎉`);
                        }, 500);
                    }
                } else {
                    flippedCards.forEach(card => {
                        card.classList.remove('flipped');
                        card.innerHTML = '💝';
                    });
                    flippedCards = [];
                }
            }, 1000);
        }
    }
}

function resetMemoryGame() {
    memoryScore = 0;
    memoryMoves = 0;
    flippedCards = [];
    document.getElementById('memory-score').textContent = '0';
    document.getElementById('memory-moves').textContent = '0';
    initMemoryGame();
}

// Quiz Game
const quizQuestions = [
    {
        question: "What makes our relationship so special?",
        options: ["The way we laugh together", "Our deep conversations", "How comfortable we are with each other", "All of the above"],
        correct: 3
    },
    {
        question: "What's the best part about our 6 months together?",
        options: ["Every single moment", "The memories we've made", "How much we've grown", "All of these and more"],
        correct: 3
    },
    {
        question: "What do I love most about your personality?",
        options: ["Your kindness", "Your sense of humor", "Your caring nature", "Everything about you"],
        correct: 3
    },
    {
        question: "How do you make me feel?",
        options: ["Happy", "Loved", "Complete", "All of the above"],
        correct: 3
    },
    {
        question: "What's our future looking like?",
        options: ["Bright and beautiful", "Full of adventures", "Filled with love", "All of these!"],
        correct: 3
    }
];

let currentQuestion = 0;
let quizScore = 0;

function initQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    document.getElementById('quiz-score').textContent = '0';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('quiz-question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestion];
    
    if (selectedIndex === question.correct) {
        quizScore++;
        document.getElementById('quiz-score').textContent = quizScore;
    }
    
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        setTimeout(showQuestion, 1000);
    } else {
        setTimeout(showQuizResult, 1000);
    }
}

function showQuizResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    
    let message = '';
    if (quizScore === 5) {
        message = "Perfect! You know our love story so well! 💕";
    } else if (quizScore >= 3) {
        message = "Great job! You really understand what makes us special! 💖";
    } else {
        message = "Every answer shows how much love we share! 💝";
    }
    
    document.getElementById('quiz-final-score').textContent = `You scored ${quizScore}/5! ${message}`;
}

function resetQuiz() {
    initQuiz();
}

// Initialize games when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMemoryGame();
    initQuiz();
});