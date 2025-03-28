const chords = ["audio/chord1.mp3", "audio/chord2.mp3", "audio/chord3.mp3"];
let currentChord = Math.floor(Math.random() * chords.length);
const audio = new Audio();

document.getElementById("playChord").addEventListener("click", () => {
    audio.src = chords[currentChord];
    audio.play();
});

document.getElementById("prevChord").addEventListener("click", () => {
    currentChord = (currentChord - 1 + chords.length) % chords.length;
});

document.getElementById("nextChord").addEventListener("click", () => {
    currentChord = (currentChord + 1) % chords.length;
});

function checkAnswer(selectedIndex) {
    const result = document.getElementById("result");
    if (selectedIndex === currentChord) {
        result.innerText = "✅ Correct!";
        result.style.color = "green";
    } else {
        result.innerText = "❌ Try Again!";
        result.style.color = "red";
    }
}