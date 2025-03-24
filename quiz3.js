const questionContainer = document.getElementById("question-container1");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const zurückButton = document.getElementById("zurück-btn")

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: "Welche Architektur ermöglicht paralleles Arbeiten mittels Threads? ",
        answers: [
          { text: "Von-Neumann-Architektur ", correct: false},
          { text: "Havard-Architektur", correct: false },
          { text: "Datenfluss-Architektur", correct: true },
          
        ],
      },
      {
        question: "Welche Architektur kombiniert Speicher und BUS? ",
        answers: [
          { text: "Von-Neumann-Architektur", correct: true },
          { text: "Datenfluss-Architektur", correct: false },
          { text: "Havard-Architektur", correct: false },
          
        ],
      },
      {
        question: "Wie überträgt ein Touchpad Bewegungen an das Betriebssystem?",
        answers: [
          { text: "Über Lichtimpulse ", correct: false },
          { text: "Über Signalmessung durch den Controller", correct: true },
          { text: "Über elektrostatische Sensoren ", correct: false },
        ],
      },
      {
        question: "Wie funktioniert die Bilddarstellung bei LCD-Monitoren?",
        answers: [
          { text: "Durch magnetische Felder ", correct: false },
          { text: "Durch Laserstrahlen", correct: false },
          { text: "Durch elektrische Impulse mit Farbfiltern", correct: true },
          
        ],
      },
      {
        question: "Wie werden Daten bei optischen Speichern gespeichert? ",
        answers: [
          { text: "Durch magnetische Felder ", correct: false },
          { text: "Durch Laser, der 0 und 1 abtastet", correct: true },
          { text: "Durch elektrische Ladung ", correct: false },
        ],
      },
      {
        question: "Welche Topologie verbindet alle Hosts über eine einzige Leitung?",
        answers: [
          { text: "BUS", correct: true },
          { text: "Ring ", correct: false },
          { text: "Stern ", correct: false },
        ],
      },
      {
        question: "Welche Topologie beschreibt alle Netzwerkknoten sind irgendwie miteinander verbunden? ",
        answers: [
          { text: "Stern ", correct: false },
          { text: "BUS ", correct: false },
          { text: "Vermaschte Topologie", correct: true },
        ],
      },
      {
        question: "Welche Adressierungsmethode basiert auf der Netzwerkkarte? ",
        answers: [
          { text: "IPv6 ", correct: falls },
          { text: "MAC-Adressen", correct: true },
          { text: " CIDR ", correct: false },
        ],
      },
      {
        question: "Wofür steht die Zahl /24 in der CIDR-Notation?",
        answers: [
          { text: "Anzahl der Hosts im Subnetz", correct: false },
          { text: " Subnetzmaske", correct: true },
          { text: "Übertragungsgeschwindigkeit ", correct: false },
          
        ],
      },
      {
        question: "Welche Schicht des OSI-Modells ist für die Datenumwandlung verantwortlich? ",
        answers: [
          { text: "Transportschicht ", correct: false },
          { text: "Sitzungsschicht", correct: false },
          { text: "Darstellungsschicht", correct: true },
        ],
      },
      {
        question: "Welcher Nutzen ergibt sich aus der Verbindung von Endgeräten in einem Rechnernetz? ",
        answers: [
          { text: "Bessere Stromversorgung", correct: false },
          { text: "Schnellere Taktung der CPUs", correct: false },
          { text: "Gemeinsames Nutzen von Peripheriegeräten", correct: true },
        ],
      },
      {
        question: "Welche Schicht des OSI-Modells stellt die physische Übertragung roher Datenbits sicher?",
        answers: [
          { text: "Bitübertragungsschicht", correct: true },
          { text: "Sicherungsschicht ", correct: false },
          { text: "Anwendungsschicht ", correct: false },
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
