const quizzes = {
    quiz1: {
        title: "Vox Continental Chord Recognition",
        image: "images/music-note.png",
        audioFiles: ["audio/chord1.mp3", "audio/chord2.mp3", "audio/chord3.mp3"],
        options: ["E Major", "C Major", "G Major"]
    },
    quiz2: {
        title: "Oberheim OB8 Chord Recognition",
        image: "images/chord-image2.png",
        audioFiles: ["audio/major-chord1.mp3", "audio/major-chord2.mp3", "audio/major-chord3.mp3"],
        options: ["D Major", "F Major", "A Major"]
    },
    quiz3: {
        title: "DX7 Chord Recognition",
        image: "images/chord-image3.png",
        audioFiles: ["audio/minor-chord1.mp3", "audio/minor-chord2.mp3", "audio/minor-chord3.mp3"],
        options: ["D Minor", "F Minor", "A Minor"]
    },
    quiz4: {
        title: "Piano (Yamaha CFX) Chord Recognition",
        image: "images/seventh-chord.png",
        audioFiles: ["audio/seventh1.mp3", "audio/seventh2.mp3", "audio/seventh3.mp3"],
        options: ["C7", "G7", "D7"]
    },
    quiz5: {
        title: "Yamaha YC-45D Chord Recognition",
        image: "images/diminished-chord.png",
        audioFiles: ["audio/diminished1.mp3", "audio/diminished2.mp3", "audio/diminished3.mp3"],
        options: ["Bdim", "Ddim", "Gdim"]
    },
    quiz6: {
        title: "Crumar Orchestrator Chord Recognition",
        image: "images/augmented-chord.png",
        audioFiles: ["audio/augmented1.mp3", "audio/augmented2.mp3", "audio/augmented3.mp3"],
        options: ["Caug", "Eaug", "Gaug"]
    }
};

let currentQuiz = "quiz1"; // Default quiz
let currentChord = Math.floor(Math.random() * quizzes[currentQuiz].audioFiles.length);
let progress = 0;
const audio = new Audio();
const progressBar = document.getElementById("progressBar");

document.getElementById("quizSelect").addEventListener("change", (event) => {
    currentQuiz = event.target.value;
    progress = 0; // Reset progress when quiz is changed
    progressBar.value = progress;
    updateQuiz();
});

function updateQuiz() {
    const quiz = quizzes[currentQuiz];

    // Update title
    document.querySelector("h1").innerText = quiz.title;

    // Update image
    document.getElementById("quizImage").src = quiz.image;

    // Update answer options
    const options = document.querySelectorAll(".option-btn");
    quiz.options.forEach((option, index) => {
        options[index].innerText = option;
    });

    // Reset chord selection
    currentChord = Math.floor(Math.random() * quiz.audioFiles.length);
}

// Play the selected chord
document.getElementById("playChord").addEventListener("click", () => {
    audio.src = quizzes[currentQuiz].audioFiles[currentChord];
    audio.play();
});

// Switch to the previous chord
document.getElementById("prevChord").addEventListener("click", () => {
    currentChord = (currentChord - 1 + quizzes[currentQuiz].audioFiles.length) % quizzes[currentQuiz].audioFiles.length;
});

// Switch to the next chord
document.getElementById("nextChord").addEventListener("click", () => {
    currentChord = (currentChord + 1) % quizzes[currentQuiz].audioFiles.length;
});

function checkAnswer(selectedIndex) {
    const result = document.getElementById("result");
    const buttons = document.querySelectorAll(".option-btn");

    if (selectedIndex === currentChord) {
        result.innerText = "✅ Correct!";
        result.style.color = "green";
        buttons[selectedIndex].classList.add("correct");
        updateProgress();
    } else {
        result.innerText = "❌ Try Again!";
        result.style.color = "red";
        buttons[selectedIndex].classList.add("incorrect");
    }

    // Remove animation class after animation completes
    setTimeout(() => {
        buttons[selectedIndex].classList.remove("correct", "incorrect");
    }, 500);
}

function updateProgress() {
    progress += 33;  // Increase progress by 10 (you can adjust this if you want)
    if (progress > 100) {
        progress = 100;  // Make sure it doesn't exceed 100
    }
    progressBar.value = progress;
}

// Initial quiz setup
updateQuiz();