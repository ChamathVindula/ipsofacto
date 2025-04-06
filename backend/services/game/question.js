const { v4: uuidv4 } = require('uuid');

class Question {
    /**
     * 
     * @param {string} question 
     * @param {string} anwser 
     * @param {Array<string>} distractions 
     * @param {object} scores 
     */
    constructor(question, anwser, distractions, scores = {}) {
        this.id = uuidv4();
        this.question = question;
        this.anwser = anwser;
        this.distractions = distractions;
        this.scores = scores;   // {player_id: score}
    }

    getId() {
        return this.id;
    }

    getQuestion() {
        return this.question;
    }

    getChoices() {
        return [...this.distractions, this.anwser].sort(() => Math.random() - 0.5);
    }

    getScores() {
        return this.scores;
    }

    getAnswer() {
        return this.anwser;
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
            anwser: this.anwser,
            distractions: this.distractions,
            scores: this.scores
        }
    }
}

module.exports = Question;