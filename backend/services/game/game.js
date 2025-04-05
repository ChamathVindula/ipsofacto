const Round = require('./round.js');

class Game {
    /**
     * 
     * @param {string} status 
     * @param {number} points_per_question 
     * @param {number} number_of_rounds 
     * @param {number} current_round 
     * @param {Array<Round>} rounds 
     */
    constructor(status, points_per_question, number_of_rounds, current_round = 1, rounds = []) {
        this.status = status;
        this.points_per_question = points_per_question;
        this.number_of_rounds = number_of_rounds;
        this.current_round = current_round;
        this.rounds = rounds.length ? this.hydrateRounds(rounds) : [];
    }

    createRound(status, genre, difficulty, number_of_questions, time_per_question) {
        let newRound = new Round(status, genre, difficulty, number_of_questions, time_per_question);
        
        newRound.generateQuestions();
        
        this.rounds.push(newRound);

        this.moveToNextRound();
    }

    moveToNextRound() {
        if(this.current_round >= this.number_of_rounds) return;
        
        this.current_round++;
    }

    hydrateRounds(rounds) {
        if(!rounds.length) return;

        this.rounds = rounds,map(round => {
            return new Round(round.status, round.genre, round.difficulty, 
                            round.number_of_questions, round.time_per_question, 
                            round.questions, round.current_question);
        });
    }
    
    serialise() {
        return {
            status: this.status,
            points_per_question: this.points_per_question,
            number_of_rounds: this.number_of_rounds,
            current_round: this.current_round,
            rounds: this.rounds.map(round => round.serialise())
        }
    }
}

export default Game;