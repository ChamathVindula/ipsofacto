const Round = require('./Round.js');

class Game {
    /**
     * 
     * @param {string} status 
     * @param {number} points_per_question 
     * @param {number} number_of_rounds 
     * @param {number} current_round 
     * @param {Array<Round>} rounds 
     */
    constructor(player_count, status, points_per_question, number_of_rounds, current_round = 0, rounds = []) {
        this.player_count = player_count;
        this.status = status;
        this.points_per_question = points_per_question;
        this.number_of_rounds = number_of_rounds;
        this.current_round = current_round;
        this.rounds = rounds.length ? this.hydrateRounds(rounds) : [];
    }

    endRound() {
        this.rounds[this.current_round-1].complete();
    }

    gameInProgress() {
        return this.status === 'in_progress';
    }

    getQuestionsOfCurrentRound() {
        return this.rounds[this.current_round-1].getQuestions();
    }

    getScoresOfCurrentRound() {
        return this.rounds[this.current_round-1].getScores();
    }

    createRound(status, genre, difficulty, number_of_questions, time_per_question) {
        let newRound = new Round(status, genre, difficulty, number_of_questions, time_per_question);
        
        newRound.generateQuestions();
        this.rounds.push(newRound);
        this.moveToNextRound();
    }

    hydrateRounds(rounds) {
        if(!rounds.length) return;

        this.rounds = rounds,map(round => {
            return new Round(round.status, round.genre, round.difficulty, 
                            round.number_of_questions, round.time_per_question, 
                            round.questions, round.current_question);
        });
    }

    pushPlayerAnwsers(player_id, anwsers) {
        this.rounds[this.current_round-1].pushPlayerAnswers(player_id, anwsers);
    }

    allPlayersFinishedCurrentRound() {
        return this.rounds[this.current_round-1].playersAnswered() === this.player_count;
    }

    moveToNextRound() {
        if(this.current_round >= this.number_of_rounds) return;
        
        this.current_round++;
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

module.exports = Game;