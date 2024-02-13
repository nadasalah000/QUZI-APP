import {categoryInput,currentQuiz,difficultyOptions,typeOptions,questions,questionsContainer,questionsNumber,quizOptionsForm,} from "./index.js";

export default class Question {
  constructor(index) {
    this.index = index;
    this.question = questions[index].question;
    this.correctAnswer = questions[index].correct_answer;
    this.category = questions[index].category;
    this.wrongAnswers = questions[index].incorrect_answers;
    this.allAnswers = this.shuffleAnswers();
    this.answered = false;
  }

  shuffleAnswers() {
    const allAnswers = [...this.wrongAnswers, this.correctAnswer];
    console.log(allAnswers);
    console.log(this.correctAnswer)
    return allAnswers.sort();
  }

  displayQuestion() {
    const questionMarkUp = `
    <div class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-success">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length} Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.allAnswers.map((choice) => `<li>${choice}</li>`).join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold">Score: ${currentQuiz.score}</h2>        
    </div>`;
    questionsContainer.innerHTML = questionMarkUp;

    const allChoices = document.querySelectorAll(".choices li");
    allChoices.forEach((choice) =>
      choice.addEventListener("click", (eventInfo) => {
        this.checkAnswer(eventInfo);
      })
    );
  }

  checkAnswer(eventInfo) {
    if (!this.answered) {
      this.answered = true;
      if (eventInfo.target.innerHTML.toLowerCase() === this.correctAnswer.toLowerCase()) {
        eventInfo.target.classList.add("correct","animate__animated","animate__flipInY");
        currentQuiz.score += 1;
      } else {
        eventInfo.target.classList.add("wrong","animate__animated","animate__shakeX");
      }
      this.animateQuestion(eventInfo.target, 500);
    }
  }

  getNextQuestion() {
    this.index++;

    if (this.index < questions.length) {
      const nextQuestion = new Question(this.index);
      nextQuestion.displayQuestion();
      return;
    }

    questionsContainer.innerHTML = currentQuiz.endQuiz();
    const tryAgain = document.querySelector(".again");
    tryAgain.addEventListener("click", function () {
      questionsContainer.querySelector(".question").classList.replace("d-flex", "d-none");
      categoryInput.value = "";
      difficultyOptions.value = "easy";
      typeOptions.value = "multiple";
      questionsNumber.value = "";
      quizOptionsForm.classList.replace("d-none", "d-flex");
    });
  }

  animateQuestion(element, duration) {
    setTimeout(() => {
      element.closest(".question").classList.add("animate__animated", "animate__bounceOutLeft");

      setTimeout(() => {
        this.getNextQuestion();
      }, duration);
    }, duration * 2);
  }
}
