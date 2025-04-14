const { v4: uuidv4 } = require('uuid');

class Question {
    /**
     * 
     * @param {string} question 
     * @param {string} answer 
     * @param {Array<string>} distractions 
     * @param {object} scores 
     */
    constructor(question, answer, distractions, scores = {}) {
        this.id = uuidv4();
        this.question = question;
        this.answer = answer;
        this.distractions = distractions;
        this.scores = scores;   // {player_id: score}
    }

    getId() {
        return this.id;
    }

    getCompiledQuestion() {
        return {
            question: this.question,
            answer: this.answer,
            distractions: this.distractions
        }
    }

    getQuestion() {
        return this.question;
    }

    getChoices() {
        return [...this.distractions, this.answer].sort(() => Math.random() - 0.5);
    }

    getScores() {
        return this.scores;
    }

    getAnswer() {
        return this.answer;
    }

    setPlayerAnswer(player_id, score) {
        this.scores[player_id] = score;
    }

    numberOfPlayersAnswered() {
        return Object.keys(this.scores).length;
    }

    serialise() {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            distractions: this.distractions,
            scores: this.scores
        }
    }
}

module.exports = Question;