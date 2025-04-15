const Round = require('./Lound.js');

class Game {
    /**
     * 
     * @param {string} status 
     * @param {number} points_per_question 
     * @param {number} number_of_rounds 
     * @param {number} current_round 
     * @param {Array<Round>} rounds 
     */
    constructor(player_count, status, points_per_question, number_of_rounds, current_round = 0, rounds = [], players_ready = 0) {
        this.player_count = player_count;
        this.status = status;
        this.points_per_question = points_per_question;
        this.number_of_rounds = number_of_rounds;
        this.current_round = current_round;
        this.rounds = rounds.length ? this.hydrateRounds(rounds) : [];
        this.players_ready = players_ready;
    }

    getRounds() {
        return this.rounds;
    }

    getCurrentRoundNumber() {
        return this.current_round;
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
        let answers = this.rounds[this.current_round-1].getPlayerAnswers();
        let scores = {};

        Object.entries(answers).forEach(([question_id, player_answers]) => {
            Object.entries(player_answers).forEach(([player_id, answer]) => {
                if(!scores[player_id]) {
                    scores[player_id] = 0;
                }
                scores[player_id] = scores[player_id] + (answer ? this.points_per_question : 0);
            });
        });

        return scores;
    }

    async setRound(round_data) {
        try {
            if(!round_data) {
                throw new Error('Invalid round data');
            }
            let newRound = this.createRound(round_data);
            let questionsGeneratedSuccessfully = await newRound.generateQuestions();

            if(!questionsGeneratedSuccessfully) {
                throw new Error('Failed to generate questions at the game level');
            }
            this.rounds.push(newRound);
            this.moveToNextRound();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    createRound(round_data) {
        return new Round(
            round_data.status, 
            round_data.genre, 
            round_data.difficulty, 
            round_data.number_of_questions, 
            round_data.time_per_question,
            round_data.questions ?? [],
            round_data.current_question ?? 0,
        );
    }

    hydrateRounds(rounds) {
        if(!rounds.length) return [];

        return rounds.map(round => {
            return this.createRound(round);
        });
    }

    resetPlayersReady() {
        this.players_ready = 0;
    }

    playerReady() {
        this.players_ready++;
    }

    pushPlayerAnswers(player_id, answers) {
        this.rounds[this.current_round-1].pushPlayerAnswers(player_id, answers);
    }

    allPlayersFinishedRound() {
        return this.rounds[this.current_round-1].playersAnsweredCount() === this.player_count;
    }

    allPlayersReady() {
        return this.players_ready === this.player_count;
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