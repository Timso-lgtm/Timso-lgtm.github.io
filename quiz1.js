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
    question: "Was sind Daten?",
    answers: [
      { text: "Physische Gegenstände", correct: false },
      { text: "Elektronisch gespeicherte Informationen", correct: true},
      { text: "Unstrukturierte Texte", correct: false },
      
    ],
  },
  {
    question: "Was versteht man unter einer Datenbasis (DB)?",
    answers: [
      { text: "Eine Programmiersprache", correct: false },
      { text: "Die Gesamtheit der Daten mit Struktur und Beziehungen", correct: true },
      { text: " Ein Datenverarbeitungssystem", correct: false },
      
    ],
  },
  {
    question: "Woraus besteht ein Datenbanksystem?",
    answers: [
      { text: "Datenbasis und Datenbankmanagement", correct: true },
      { text: "Nur aus Tabellen", correct: false },
      { text: "Aus Dateien ohne Struktur ", correct: false },
      
    ],
  },
  {
    question: "Welcher Vorteil gehört NICHT zu Datenbanken?",
    answers: [
      { text: "Dynamisches Wachstum der Zeilenanzahl", correct: false },
      { text: "Zugriffskontrolle durch Login", correct: false },
      { text: "Eingeschränkte Anzahl an Datensätzen", correct: true },
      
    ],
  },
  {
    question: "Was ist ein Primärschlüssel? ",
    answers: [
      { text: "Eine zufällige Zahl", correct: false },
      { text: "Ein eindeutiger Identifier ohne Duplikate", correct: true },
      { text: "Ein frei definierbares Textfeld ", correct: false },
    ],
  },{
    question: "Welche Beziehung beschreibt jede Mutter kann mehrere Kinder haben?",
    answers: [
      { text: "1:1 ", correct: false },
      { text: "1:n", correct: true },
      { text: "n:m", correct: false },
    ],
  },{
    question: "Welcher Felddatentyp gehört zu Access?",
    answers: [
      { text: "Autowert", correct: true },
      { text: " Bilder ", correct: false },
      { text: " Audio ", correct: false },
     
    ],
  },{
    question: "Welches Eingabeformat kann für ein Datum genutzt werden? ",
    answers: [
      { text: "MM-DD-JJJJ ", correct: false },
      { text: "TT.MM.JJJJ", correct: true },
      { text: "JJJJ/MM/TT ", correct: false },
    ],
  },{
    question: "Welche Frage ist KEIN Teil der Bedarfsanalyse?",
    answers: [
      { text: "Wer benutzt die Datenbank?", correct: false },
      { text: "Welche Daten müssen erfasst werden?", correct: false },
      { text: "Welche Daten müssen erfasst werden?", correct: true },
    ],
  },{
    question: "Wie wird eine Beziehung zwischen zwei Tabellen hergestellt? ",
    answers: [
      { text: "Durch Hinzufügen von Tabellen ohne Schlüssel", correct: false },
      { text: "Durch Fremdschlüssel und Verknüpfungstabellen", correct: true },
      { text: "Nur durch Kopieren der Daten ", correct: false },
    ],
  },{
    question: "Was ist ein Datenfeld? ",
    answers: [
      { text: "Ein einzelnes Feld in einer Datenbankzelle", correct: true },
      { text: "Eine komplette Tabelle ", correct: false },
      { text: "Der Titel einer Spalte ", correct: false },
      
    ],
  },{
    question: "Welche Methode wird bei der Datenanalyse verwendet, um Entitäten zu identifizieren? ",
    answers: [
      { text: "Zufallsanalyse", correct: false },
      { text: " Nominalextraktion", correct: true },
      { text: "Tabellenkopie ", correct: false },
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
}

document.getElementById('backButton').addEventListener('click', function() {
  window.history.back();
});
