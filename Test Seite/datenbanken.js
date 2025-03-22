
//Quiz
(function() {
    const myQuestions = [
        {
            question: "Was sind Daten?",
            answers: {
                a: "Physische Gegenstände",
                b: "Elektronisch gespeicherte Informationen",
                c: "Unstrukturierte Texte"
            },
            correctAnswer: "b"
        },
        {
            question: "Was versteht man unter einer Datenbasis?",
            answers: {
                a: "Eine Programmiersprache",
                b: "Die Gesamtheit der Daten mit Struktur und Beziehungen",
                c: "Ein Datenverarbeitungssystem"
            },
            correctAnswer: "b"
        },
        {
            question: "Woraus besteht eine Datenbanksystem",
            answers: {
                a: "Datenbasis und Datenbankmanagement",
                b: "Nur aus Tabellen",
                c: "Aus Datein ohne Struktur "
            },
            correctAnswer: "a"
        },
        {
            question: "Welcher Vorteil gehört nicht zu Datenbanken?",
            answers: {
                a: "Dynamisches Wachstum der Zeilenzahl",
                b: "Zugriffskontrolle durch Login",
                c: "Eingeschränkte Anzahl an Datensätzen"
            },
            correctAnswer: "c"
        }
        
    ];

    function buildQuiz() {
        const output = [];
        
        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                      <input type="radio" name="question${questionNumber}" value="${letter}">
                      ${letter} :
                      ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        });

        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');

        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'green';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        resultsContainer.innerHTML = `${numCorrect} von ${myQuestions.length} richtig`;
    }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    buildQuiz();

    submitButton.addEventListener('click', showResults);
})();