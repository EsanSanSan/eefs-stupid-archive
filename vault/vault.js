document.addEventListener("DOMContentLoaded", function() {
  const questions = [
    { q: "What is 2 + 2?", a: "4" },
    { q: "Type the secret word: banana", a: "banana" },
    { q: "What color is the sky on a clear day?", a: "blue" }
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
    answerInput.focus(); // optional: auto-focus the box
  }

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestion].a.trim().toLowerCase();

  if (userAnswer === correctAnswer) {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      vault.style.visibility = "visible";
      vault.style.pointerEvents = "auto";

      // 🆕 Trigger reverse slam animation
      overlay.style.animation = "vaultSlamOut 0.6s ease-in forwards";

      // After animation ends, hide overlay
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

  // 🆕 Pressing Enter triggers the same as clicking submit
  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  });

  showQuestion();
});
