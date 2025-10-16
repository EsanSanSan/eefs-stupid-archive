document.addEventListener("DOMContentLoaded", function() {
  const questions = [
    { q: "What is 2 + 2?", a: ["4", "four"] },
    { q: "Type the secret word: banana", a: ["banana"] },
    { q: "What color is the sky on a clear day?", a: ["blue"] }
  ];

  let currentQuestion = 0;

  const overlay = document.getElementById("vault-overlay");
  const questionText = document.getElementById("vault-question");
  const answerInput = document.getElementById("vault-answer");
  const submitBtn = document.getElementById("vault-submit");
  const feedback = document.getElementById("vault-feedback");
  const vault = document.getElementById("vaultlocked");

  function showQuestion() {
    questionText.textContent = questions[currentQuestion].q;
    answerInput.value = "";
    feedback.textContent = "";
    answerInput.focus();
  }

  function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswers = questions[currentQuestion].a.map(a => a.trim().toLowerCase());

    if (correctAnswers.includes(userAnswer)) {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        vault.style.visibility = "visible";
        vault.style.pointerEvents = "auto";

        // Reverse slam animation
        overlay.style.animation = "vaultSlamOut 0.6s ease-in forwards";

        overlay.addEventListener("animationend", function handleEnd() {
          overlay.style.display = "none";
          overlay.removeEventListener("animationend", handleEnd);
        });
      }
    } else {
      feedback.textContent = "❌ WRONG BITCH";
    }
  }

  submitBtn.addEventListener("click", checkAnswer);
  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  });

  showQuestion();
});
