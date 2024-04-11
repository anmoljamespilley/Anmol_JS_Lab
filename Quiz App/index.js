class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    get currentQuestion() {
        return this.questions[this.questionIndex];
    }

    checkAnswer(answer) {
        if (this.currentQuestion.answer === answer) {
            this.score++;
        }
        this.moveToNextQuestion();
    }

    moveToNextQuestion() {
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

class Question {
    constructor(text, options, answer) {
        this.text = text;
        this.options = options;
        this.answer = answer;
    }
}

class QuizUI {
    constructor(quiz) {
        this.quiz = quiz;
    }

    displayQuestion() {
        const quizElem = document.getElementById("quiz");
        if (this.quiz.isEnded()) {
            this.showScores(quizElem);
        } else {
            const questionElem = document.getElementById("question");
            questionElem.innerText = this.quiz.currentQuestion.text;

            const choices = this.quiz.currentQuestion.options;
            choices.forEach((choice, index) => {
                const choiceElem = document.getElementById(`choice${index}`);
                choiceElem.innerText = choice;
                this.handleClickOnBtn(`btn${index}`, choice);
            });

            this.showProgress(quizElem);
        }
    }

    showProgress(quizElem) {
        const progressElem = quizElem.querySelector("#progress");
        progressElem.innerText = `Question ${this.quiz.questionIndex + 1} of ${this.quiz.questions.length}`;
    }

    handleClickOnBtn(id, choice) {
        const buttonElem = document.getElementById(id);
        const quiz = this.quiz;
        buttonElem.onclick = function () {
            quiz.checkAnswer(choice);
            quizUI.displayQuestion();
        };
    }

    showScores(quizElem) {
        const result = `<h1>Result</h1><h2 id="score">Thank you! Here are your results: <br>Score: ${this.quiz.score}/${this.quiz.questions.length} <br> Marks percentage: ${(this.quiz.score / this.quiz.questions.length) * 100}% </h2>`;
        quizElem.innerHTML = result;
    }
}

const questions = [
    new Question("In CSS, which property is used to change the color of text?",
                ["background-colour", "text-colour", "colour", "font-colour"],
                "colour"),
    new Question("Which keyword is used to define a class in Java?",
                ["class", "void", "int", "new"],
                "class"),
    new Question("What is the purpose of SQL 'INSERT INTO' statement?",
                ["To delete data from a table", "To update existing data", "To add new data into a table", "To select data from a table"],
                "To add new data into a table"),
    new Question("What is the result of 5 + 7 * 2 in most programming languages?",
                ["24", "19", "26", "21"],
                "19"),
    new Question("What does CSS stand for?",
                ["Cascading Style Sheets", "Creative Style Syntax", "Colorful Style System", "Computer Style Sheets"],
                "Cascading Style Sheets")
];

const quiz = new Quiz(questions);
const quizUI = new QuizUI(quiz);
quizUI.displayQuestion();
