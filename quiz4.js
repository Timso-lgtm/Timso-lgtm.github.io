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
    question: "Was bewirkt das Symbol „cut“ (!) in Prolog? ",
    answers: [
      { text: "Es fügt Schleifen hinzu", correct: false },
      { text: "Es beendet die Berechnung vollständig", correct: false},
      { text: "Es begrenzt die Suche und stoppt unnötige Berechnungen**", correct: true },
      { text: "Es ignoriert logische Konsequenzen", correct: false },
    ],
  },{
    question: "Welche mögliche Folge kann auftreten, wenn „cut“ falsch verwendet wird?",
    answers: [
      { text: "Es erhöht die Effizienz ohne Fehler", correct: false },
      { text: "Es hat keine Auswirkungen", correct: false },
      { text: "Es kann logische Konsequenzen beeinflussen und zu unerwarteten Ergebnissen führen", correct: true },
      { text: "Es beendet die Programmierung sofort", correct: false },
    ],
  },{
    question: "Wofür wird die logische Programmierung typischerweise verwendet?",
    answers: [
      { text: "Komplexe mathematische Berechnungen", correct: true },
      { text: "Modellierung und Lösung von logischen Problemen", correct: false },
      { text: "Verarbeitung großer Datenmengen", correct: false },
      { text: "Grafikdesign", correct: true },

    ],
  },{
    question: "Was versteht man unter einer „Regel“ in Prolog?",
    answers: [
      { text: "Eine Anweisung, die keine Eingabe benötigt", correct: false },
      { text: "Eine logische Beziehung zwischen Fakten und Bedingungen", correct: true },
      { text: "Eine Schleife ohne Bedingung", correct: false },
      { text: "Eine Funktion zur Datenausgabe", correct: false },
    ],
  },{
    question: "Welche Aussage beschreibt einen Fakt in Prolog am besten? ",
    answers: [
      { text: "Eine grundlegende Einheit der Information, die immer wahr ist", correct: false },
      { text: "Eine Beziehung zwischen mehreren Variablen", correct: true },
      { text: "Ein Ergebnis einer Berechnung", correct: false },
      { text: " Eine Variable, die sich ändert", correct: false },
    ],
  },{
    question: "Wie funktioniert Backtracking in Prolog?",
    answers: [
      { text: "Es ignoriert fehlgeschlagene Regeln", correct: false },
      { text: "Es führt zu einem Fehler, wenn eine Regel nicht zutrifft", correct: false },
      { text: "Es kehrt zurück und sucht alternative Lösungen", correct: true },
      { text: "Es beendet die Suche vollständig ", correct: false },
     
    ],
  },{
    question: "Warum ist die logische Programmierung besonders nützlich?",
    answers: [
      { text: "Sie eignet sich für die Modellierung von Problemen mit klaren logischen Beziehungen", correct: true },
      { text: "Sie ist schneller als andere Programmiermethoden", correct: false },
      { text: "Sie nutzt keine Variablen", correct: false },
      { text: "Sie nutzt keine Variablen", correct: false },
    ],
  },{
    question: "Wie wird ein Fakt in Prolog korrekt definiert?",
    answers: [
      { text: "name(argument).", correct: true },
      { text: "name->argument.", correct: false },
      { text: "if(argument).", correct: false },
      { text: "print(argument)", correct: false },
    ],
  },{
    question: "Was passiert, wenn alle Bedingungen in einer Regel erfüllt sind?",
    answers: [
      { text: "Die Regel wird ignoriert", correct: false },
      { text: "Die Regel wird als wahr betrachtet", correct: true },
      { text: "Die Regel wird beendet", correct: false },
      { text: "Es werden neue Bedingungen erstellt", correct: false },
    ],
  },{
    question: "Welches Ziel verfolgt die logische Programmierung?",
    answers: [
      { text: "Automatisierung des logischen Denkens und Problemlösens", correct: true },
      { text: "Optimierung von mathematischen Gleichungen", correct: false },
      { text: "Erstellung visueller Inhalte", correct: false },
      { text: "Datenkompression", correct: false },
      
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
