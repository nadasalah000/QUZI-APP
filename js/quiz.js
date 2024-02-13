export default class Quiz {
    constructor(category, difficulty, type, numberOfQuestions) {
      this.category = category;
      this.difficulty = difficulty;
      this.type = type;
      this.numberOfQuestions = numberOfQuestions;
      this.score = 0;
    }
  
    async getQuestions() {
      const response = await fetch(`https://opentdb.com/api.php?amount=${this.numberOfQuestions}&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}`);
      const data = await response.json();
      console.log(data.results);
      return data.results;
    }
  
    endQuiz() {
      return `
      <div class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3">
        <h2 class="mb-0">${this.score == this.numberOfQuestions? `Congratulations`: `sorry`}</h2>
        <h3 class="mb-0">Your score is : ${this.score}</h3>
        <button class="again btn btn-outline-success rounded-pill"> Try Again</button>
      </div>`;
    }
  }