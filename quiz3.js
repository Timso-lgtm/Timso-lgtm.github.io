const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const zurückButton = document.getElementById("zurück-btn")

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "Was ist ein Algorithmus?",
    answers: [
      { text: "Eine Folge von wahllosen Anweisungen", correct: false },
      { text: "Ein Rezept, um immer unterschiedliche Probleme zu lösen", correct: false},
      { text: "Eine Verarbeitungsvorschrift, die Eingangsgrößen in Ausgangsgrößen umwandelt", correct: true },
      { text: "Ein nicht definierter Prozess", correct: false },
    ],
  },{
    question: "Welche Eigenschaft gehört NICHT zu einem Algorithmus?",
    answers: [
      { text: "Ausführbarkeit", correct: false },
      { text: "Determinismus ", correct: false },
      { text: "Endlichkeit", correct: false },
      { text: "Zufälligkeit", correct: true },
      
    ],
  },{
    question: "Was bedeutet Determinismus in Bezug auf einen Algorithmus?",
    answers: [
      { text: "Die Reihenfolge der Schritte ist zufällig", correct: false },
      { text: "Der Algorithmus ist endlos ", correct: false },
      { text: "Die Reihenfolge ist eindeutig festgelegt", correct: true },
      { text: "Es gibt keine Reihenfolge", correct: false },
    ],
  },{
    question: "Welches ist KEIN Bestandteil eines Algorithmus?",
    answers: [
      { text: "Eingabe", correct: false },
      { text: "Ausgabe ", correct: false },
      { text: "Datenverlust", correct: true },
      { text: "Verarbeitung ", correct: false },
    ],
  },{
    question: "Welche der folgenden ist eine typische Schleifenart in Algorithmen?",
    answers: [
      { text: "for und while", correct: true },
      { text: "true und false", correct: false },
      { text: "true und false", correct: false },
      { text: "start und stop", correct: false },
    ],
  },{
    question: "Warum ist die Terminierung wichtig?",
    answers: [
      { text: "Damit ein Algorithmus für immer weiterläuft", correct: false },
      { text: "Um sicherzustellen, dass ein Ergebnis erreicht wird", correct: true },
      { text: "Um die Reihenfolge festzulegen", correct: false },
      { text: "Damit der Algorithmus unendlich Daten verarbeiten kann ", correct: false },
    ],
  },{
    question: "Was bedeutet „Ausführbarkeit“ in Bezug auf Algorithmen?",
    answers: [
      { text: "Jeder Schritt kann vom Prozessor durchgeführt werden", correct: true },
      { text: "Nur die ersten Schritte müssen machbar sein", correct: false },
      { text: "Der Algorithmus kann endlos laufen", correct: false },
      { text: "Ausführbarkeit ist nicht notwendig", correct: false },
     
    ],
  },{
    question: "Welches ist ein Beispiel für eine einfache Anweisung in einem Algorithmus?",
    answers: [
      { text: "while(x > 5)", correct: false },
      { text: "System.out.println(Hello)", correct: true },
      { text: "for (i=0; i<10; i++)", correct: false },
      { text: "if(x==y)", correct: false },
    ],
  },{
    question: "Was geschieht während der „Verarbeitung“ eines Algorithmus?",
    answers: [
      { text: "Daten werden ignoriert", correct: false },
      { text: "Daten werden nach Regeln verarbeitet", correct: true },
      { text: "Daten werden ausgegeben, ohne sie zu ändern", correct: false },
      { text: "Daten gehen verloren", correct: false },
    ],
  },{
    question: "Welche Bedeutung hat die „Ausgabe“ in einem Algorithmus?",
    answers: [
      { text: "Es gibt keine Bedeutung", correct: false },
      { text: "Sie liefert das Ergebnis der Verarbeitung", correct: true },
      { text: "Sie startet den Algorithmus ", correct: false },
      { text: "Sie ist Teil der Eingabe", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
  show
}

document.getElementById('backButton').addEventListener('click', function() {
  window.history.back();
});
