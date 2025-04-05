class Question {
    /**
     * 
     * @param {string} question 
     * @param {string} anwser 
     * @param {Array<string>} distractions 
     * @param {object} scores 
     */
    constructor(question, anwser, distractions, scores = {}) {
        this.question = question;
        this.anwser = anwser;
        this.distractions = distractions;
        this.scores = scores;   // {player_id: score}
    }

    getQuestion() {
        return this.question;
    }

    getChoices() {
        return [...this.distractions, this.anwser].sort(() => Math.random() - 0.5);
    }

    getAnswer() {
        return this.anwser;
    }

    setScore(player_id, score) {
        this.scores[player_id] = score;
    }

    numberOfPlayersAnswered() {
        return Object.keys(this.scores).length;
    }

    serialise() {
        return {
            question: this.question,
            anwser: this.anwser,
            distractions: this.distractions,
            scores: this.scores
        }
    }
}

export default Question;