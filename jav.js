let streakCount = 0; // Contador de rachas
let incorrectAttempts = 0;
let currentQuestion = 0;
let hintTimeout;
let hintShown = false;

const questions = [
    { image: 'Elements/bur.jpg', answer: 'buret' },
    { image: 'Elements/thistle.jpg', answer: 'thistle funnel' },
    { image: 'Elements/pi.jpg', answer: 'pipet' },
    { image: 'Elements/buns.jpg', answer: 'bunsen burner' },
    { image: 'Elements/med.jpg', answer: 'medicine dropper' },
    { image: 'Elements/scal.jpg', answer: 'scalpel' },
    { image: 'Elements/bea.jpg', answer: 'beaker' },
    { image: 'Elements/met.jpg', answer: 'meter stick' },
    { image: 'Elements/woo.jpg', answer: 'wood splint' },
    { image: 'Elements/ton.jpg', answer: 'beaker tongs' },
    { image: 'Elements/bottle.jpg', answer: 'bottle brush' },
    { image: 'Elements/tongs.jpg', answer: 'tongs' },
    { image: 'Elements/pet.jpg', answer: 'petri dishes' },
    { image: 'Elements/erl.jpg', answer: 'erlenmeyer flask' },
    { image: 'Elements/gra.jpg', answer: 'graduated cylinder' },
    { image: 'Elements/mor.jpg', answer: 'mortar + pestle' },
    { image: 'Elements/rin.jpg', answer: 'ring stand' },
    { image: 'Elements/flo.jpg', answer: 'florence flask' },
    { image: 'Elements/mic.jpg', answer: 'microscope' },
    { image: 'Elements/testube.jpg', answer: 'test tube' },
    { image: 'Elements/the.jpg', answer: 'thermometer' },
    { image: 'Elements/cla.jpg', answer: 'clay triangle' },
    { image: 'Elements/holder.jpg', answer: 'test tube holder' },
    { image: 'Elements/cru.jpg', answer: 'crucible' },
    { image: 'Elements/rea.jpg', answer: 'reagent bottle' },
    { image: 'Elements/wir.jpg', answer: 'wire gauze' },
    { image: 'Elements/gog.jpg', answer: 'goggles' },
    { image: 'Elements/twe.jpg', answer: 'tweezers' },
    { image: 'Elements/hot.jpg', answer: 'hot plate' },
    { image: 'Elements/bal.jpg', answer: 'balance' },
    { image: 'Elements/wat.jpg', answer: 'watch glass' },
    { image: 'Elements/cov.jpg', answer: 'cover slip' },
    { image: 'Elements/funel.jpg', answer: 'funnel' },
    { image: 'Elements/sci.jpg', answer: 'scissors' },
    { image: 'Elements/evapo.jpg', answer: 'evaporating dish' },
    { image: 'Elements/test_tube_rack.jpg', answer: 'test tube rack' },
    { image: 'Elements/slide.jpg', answer: 'slide' },
    { image: 'Elements/probe.jpg', answer: 'probe' }
];

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function loadQuestion() {
    document.getElementById("message").innerText = "";
    document.getElementById("message").classList.remove("correct", "incorrect");
    document.getElementById("answer-input").value = "";
    document.getElementById("retry-container").classList.remove("active");
    document.getElementById("retry-message").innerText = "";
    document.getElementById("completion-container").classList.remove("active");
    
    const question = questions[currentQuestion];
    document.getElementById("object-image").src = question.image;
    document.getElementById("answer-input").style.display = 'inline-block'; // Ensure the input is visible
    hintShown = false;

    // Set a timeout to show hint button after 9 seconds
    hintTimeout = setTimeout(() => {
        document.getElementById("hint-button").style.display = 'inline-block';
    }, 9000);
}

function giveHint() {
    if (!hintShown) {
        const hint = questions[currentQuestion].answer.substring(0, 4);
        document.getElementById("message").innerText = `Hint: ${hint}`;
        hintShown = true;
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();

    clearTimeout(hintTimeout); // Clear the hint timeout once answered
    document.getElementById("hint-button").style.display = 'none';

    if (userAnswer === correctAnswer) {
        document.getElementById("message").innerText = "Correct!";
        document.getElementById("message").classList.add("correct");
        updateStreak(true);
        incorrectAttempts = 0;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(loadQuestion, 1000);
        } else {
            endQuiz();
        }
    } else {
        document.getElementById("message").innerText = `Incorrect. The correct answer is: ${questions[currentQuestion].answer}`;
        document.getElementById("message").classList.add("incorrect");
        updateStreak(false);
        incorrectAttempts++;
        document.getElementById("retry-container").classList.add("active");
    }
}

function validateRetries() {
    const retryInputs = document.querySelectorAll(".retry-input");
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();
    let allCorrect = true;

    retryInputs.forEach(input => {
        if (input.value.trim().toLowerCase() !== correctAnswer) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        document.getElementById("retry-message").innerText = "All answers correct!";
        document.getElementById("retry-message").classList.add("correct");
        updateStreak(true);
        setTimeout(() => {
            document.getElementById("retry-container").classList.remove("active");
            incorrectAttempts = 0;
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        }, 1000);
    } else {
        document.getElementById("retry-message").innerText = "Some answers are still incorrect.";
        document.getElementById("retry-message").classList.add("incorrect");
    }
}

function updateStreak(correct) {
    const streakIcon = document.getElementById("streak-icon");
    const streakCount = document.getElementById("streak-count");

    if (correct) {
        streakCount.innerText = ++streakCount.innerText;
        streakIcon.style.display = 'inline';
    } else {
        streakCount.innerText = '0';
        streakIcon.style.display = 'none';
    }
}

function restartQuiz() {
    currentQuestion = 0;
    incorrectAttempts = 0;
    streakCount = 0;  // Reset the streak count
    document.getElementById("streak-count").innerText = streakCount;  // Update the display
    shuffleQuestions();
    document.getElementById("completion-container").classList.remove("active");
    document.getElementById("quiz-container").classList.add("active");
    loadQuestion();
}

function endQuiz() {
    document.getElementById("quiz-container").classList.remove("active");
    document.getElementById("completion-container").classList.add("active");
}

function handleKeyPress(event) {
    const input = document.getElementById("answer-input");
    if (event.key === 'Enter') {
        if (document.activeElement === input && input.value.trim() !== '') {
            checkAnswer();
        } else {
            input.focus();
        }
    }
}

document.getElementById("answer-input").addEventListener("keypress", handleKeyPress);

window.onload = function() {
    shuffleQuestions();
    loadQuestion();
};