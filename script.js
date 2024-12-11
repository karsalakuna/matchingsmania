const questions = [
    {
        shadow: "SOAL PATTERN RECOGNITION/soalayam.png",
        options: ["SOAL PATTERN RECOGNITION/ayam2.png", "SOAL PATTERN RECOGNITION/ayam3.png", "SOAL PATTERN RECOGNITION/ayam1.png", "SOAL PATTERN RECOGNITION/ayam4.png"],
        answer: "SOAL PATTERN RECOGNITION/ayam1.png"
    },
    {
        shadow: "SOAL PATTERN RECOGNITION/soalhiu.png",
        options: ["SOAL PATTERN RECOGNITION/hiu4.png", "SOAL PATTERN RECOGNITION/hiu1.png", "SOAL PATTERN RECOGNITION/hiu2.png", "SOAL PATTERN RECOGNITION/hiu3.png"],
        answer: "SOAL PATTERN RECOGNITION/hiu1.png"
    },
    {
        shadow: "SOAL PATTERN RECOGNITION/soalbabi.png",
        options: ["SOAL PATTERN RECOGNITION/babi1.png", "SOAL PATTERN RECOGNITION/babi2.png", "SOAL PATTERN RECOGNITION/babi3.png", "SOAL PATTERN RECOGNITION/babi4.png"],
        answer: "SOAL PATTERN RECOGNITION/babi1.png"
    },
    {
        shadow: "SOAL PATTERN RECOGNITION/soalgajah.png",
        options: ["SOAL PATTERN RECOGNITION/gajah4.png", "SOAL PATTERN RECOGNITION/gajah3.png", "SOAL PATTERN RECOGNITION/gajah2.png", "SOAL PATTERN RECOGNITION/gajah1.png"],
        answer: "SOAL PATTERN RECOGNITION/gajah1.png"
    },
    {
        shadow: "SOAL PATTERN RECOGNITION/soalular.png",
        options: ["SOAL PATTERN RECOGNITION/ular1.png", "SOAL PATTERN RECOGNITION/ular4.png", "SOAL PATTERN RECOGNITION/ular3.png", "SOAL PATTERN RECOGNITION/ular2.png"],
        answer: "SOAL PATTERN RECOGNITION/ular1.png"
    },
]

let currentQuestionIndex = 0;
let timer;
let timeLeft = 10;
let score = 0; // Tambahkan variabel untuk menyimpan skor

// Fungsi untuk memutar suara klik
function playClickSound() {
    const clickSound = document.getElementById("click-sound");
    clickSound.currentTime = 0;
    clickSound.play()
}

function showInstructions () {
    document.getElementById("instructions").style.display = "block";
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    playClickSound();
    document.getElementById("game-title").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("quiz-container").style.display = "block"; // Tampilkan kontainer kuis
    loadQuestion();
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("time").innerText = timeLeft;
    document.getElementById("feedback").innerText = ""; // Kosongkan pesan sebelumnya

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("feedback").innerText = "Waktu habis!"; // Tampilkan pesan di elemen feedback
            nextQuestion(); // Panggil fungsi untuk pertanyaan berikutnya
        }
    }, 1000);
}

function loadQuestion() {
        const questionElement = document.getElementById("question");
        const optionsElement = document.getElementById("options");
        const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML = `<img src="${currentQuestion.shadow}" alt="Bayangan" />`;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.innerHTML = `<img src="${option}" alt="Pilihan" style="width: 100px; height: auto;">`;
        optionElement.onclick = () => {
            playClickSound();
        checkAnswer(option);
        };
        optionsElement.appendChild(optionElement);
    });

    startTimer();
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const feedbackElement = document.getElementById("feedback"); // Ambil elemen feedback

    if (selectedOption === currentQuestion.answer) {
        
        feedbackElement.innerText = "Jawaban benar!";
        feedbackElement.style.color = "green"; // Ubah warna menjadi hijau
        score++; // Tambah skor jika jawaban benar
    } else {
        feedbackElement.innerText = "Jawaban salah!";
        feedbackElement.style.color = "red"; // Ubah warna menjadi merah
    }

    setTimeout(() => {
        feedbackElement.innerText = ""; // Kosongkan pesan setelah beberapa detik
        nextQuestion();
    }, 1000); // Tunggu 1 detik sebelum berpindah ke pertanyaan berikutnya
}

function nextQuestion() {
    clearInterval(timer); // Hentikan timer ketika berpindah ke pertanyaan berikutnya
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        const scoreBox = document.getElementById("score-box");
        const finalScoreElement = document.getElementById("final-score");
        
        finalScoreElement.innerText = `Kuis selesai! Skor Anda adalah: ${score}`; // Tampilkan skor akhir
        scoreBox.style.display = "block"; // Tampilkan box
        document.getElementById("restart-confirmation").style.display = "block"; // Tampilkan box konfirmasi

        const winSound = document.getElementById("win-sound");
        winSound.currentTime = 0;
        winSound.play();
        }
    }

function showScore() {
    document.getElementById('questiond').style.display = "none";
    document.getElementById("score-box").style.display = 'block';
    const scoreText = document.getElementById('score-text');
    scoreText.textContent = `Anda mendapatkan ${score} dari ${questions.length} pertanyaan.`;
}

function restartQuiz() {
    currentQuestionIndex = 0; // Reset indeks pertanyaan
    score = 0; // Reset skor
    document.getElementById("score-box").style.display = "none"; // Sembunyikan box skor
    document.getElementById("restart-confirmation").style.display = "none"; // Sembunyikan box konfirmasi
    loadQuestion(); // Muat pertanyaan pertama
    startTimer(); // Mulai timer kembali
}

function cancelRestart() {
    document.getElementById("restart-confirmation").style.display = "none"; // Sembunyikan box konfirmasi
}

// Fungsi untuk menampilkan instruksi setelah judul
function showInstructionsAfterTitle() {
    setTimeout(() => {
        document.getElementById("instructions").style.display = "block"; // Tampilkan instruksi setelah 2 detik
    }, 2000); // Jeda 2 detik
}

// Event listener untuk menyembunyikan kontainer kuis saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("quiz-container").style.display = "none";
    showInstructionsAfterTitle(); 
});