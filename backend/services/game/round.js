const Question = require('./question.js');

class Round {
    /**
     * 
     * @param {string} status 
     * @param {string} genre 
     * @param {string} difficulty 
     * @param {number} number_of_questions 
     * @param {number} time_per_question 
     * @param {Array<Question>} questions 
     * @param {number} current_question 
     */
    constructor(status, genre, difficulty, number_of_questions, time_per_question, questions = [], current_question = 0) {
        this.status = status;
        this.genre = genre;
        this.difficulty = difficulty;
        this.number_of_questions = number_of_questions;
        this.time_per_question = time_per_question;
        this.questions = questions.length ? this.hydrateQuestions(questions) : [];
        this.current_question = current_question;
    }

    hydrateQuestions(questions) {
        this.questions = questions.map(question => {
            return new Question(question.question, question.answer, question.distractions, question.scores);
        });
    }

    generateQuestions() {
        // Use chatgpt api to generate questions
    }

    getQuestion() {
        let question = this.questions[this.current_question];
        
        if(!question) return null;

        return {
            question: question.getQuestion(),
            choices: question.getChoices(),
            answer: question.getAnswer()
        }
    }

    updateScore(question_index, player_id, score) {
        //...
    }

    moveToNextQuestion() {
        this.current_question++;
    }

    serialise() {
        return {
            status: this.status,
            genre: this.genre,
            difficulty: this.difficulty,
            number_of_questions: this.number_of_questions,
            time_per_question: this.time_per_question,
            questions: this.questions.map(question => question.serialise()),
            current_question: this.current_question
        }
    }
}

export default Round;