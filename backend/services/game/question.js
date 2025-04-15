const { v4: uuidv4 } = require('uuid');

class Question {
    /**
     * 
     * @param {string} question 
     * @param {string} answer 
     * @param {Array<string>} distractions 
     * @param {object} player_answers 
     */
    constructor(id, question, answer, distractions, player_answers = {}) {
        this.id = id ?? uuidv4();               // Id could be null if the question was just created
        this.question = question;
        this.answer = answer;
        this.distractions = distractions;
        this.player_answers = player_answers;   // {player_id: answer}
    }

    getId() {
        return this.id;
    }

    getCompiledQuestion() {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            distractions: this.distractions.sort(() => Math.random() - 0.5)
        }
    }

    getQuestion() {
        return this.question;
    }

    getChoices() {
        return [...this.distractions].sort(() => Math.random() - 0.5);
    }

    getPlayerAnswers() {
        return this.player_answers;
    }

    getAnswer() {
        return this.answer;
    }

    setPlayerAnswer(player_id, answer) {
        this.player_answers[player_id] = answer === this.answer;
    }

    numberOfPlayersAnswered() {
        return Object.keys(this.player_answers).length;
    }

    serialise() {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            distractions: this.distractions,
            player_answers: this.player_answers
        }
    }
}

module.exports = Question;