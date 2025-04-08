const { getRoom, hydrateRoom, persistRoom } = require('../utils/gameStateUtils');

module.exports = (socket, io) => {
    /**
     * Create a new game and assign it to a specific room.
     * 
     * @param {string} room_id 
     * @param {number} points_per_question 
     * @param {number} number_of_rounds 
     */
    const startGame = (room_id, points_per_question, number_of_rounds) => {
        const status = 'in_progress';
        const roomData = getRoom(room_id);
        
        if(!roomData) {
            socket.emit('room_not_found');
            return;
        }
        const room = hydrateRoom(roomData);             // Create a room instance from the existing room data
        
        if(room.gameInProgress()) {
            return;
        }
        const gameData = {
            status: status,
            points_per_question: points_per_question,
            number_of_rounds: number_of_rounds,
            current_round: 0,
            rounds: []
        }
        room.setGame(gameData);
        socket.emit('game_starting', room.serialise()); // Notify all players in the room that the game is starting
    }
    
    const endGame = () => {
        //...
    }

    /**
     * Initiate a new round of an active game in a specific room.
     * 
     * @param {string} room_id 
     * @param {string} genre 
     * @param {string} difficulty 
     * @param {number} number_of_questions 
     * @param {number} time_per_question 
     */
    const startRound = (room_id, genre, difficulty, number_of_questions, time_per_question) => {
        const status = 'in_progress';
        const roomData = getRoom(room_id);
        
        if(!roomData) {
            socket.emit('room_not_found');
            return;
        }
        const room = hydrateRoom(roomData);
        
        if(!room.gameInProgress()) {
            socket.emit('game_not_in_progress');
            return;
        }
        room.game().createRound(status, genre, difficulty, number_of_questions, time_per_question);

        persistRoom(room); // Save the updated room state to Redis

        const round = room.game().current_round;
        const questions = room.game().getQuestionsOfCurrentRound();
        const startRoundAt = Date.now() + 5000; // Start the round five seconds after the round is created
        socket.emit('start_round', round, startRoundAt, questions); // Notify all players in the room that the round is starting
    }

    /**
     * Save the player's answer to the game state.
     * If all players have finished the round, notify all 
     * players in the room that the round is finished.
     * 
     * @param {string} room_id 
     * @param {string} player_id 
     * @param {object} answers 
     */
    const pushAnwsers = (room_id, player_id, answers) => {
        const roomData = getRoom(room_id);

        if(!roomData) {
            socket.emit('room_not_found');
            return;
        }
        const room = hydrateRoom(roomData);

        if(!room.playerExists(player_id)) {
            socket.emit('player_not_in_room');
            return;
        }
        room.game().pushPlayerAnwsers(player_id, answers);  // Push the player's answers to the game state
        persistRoom(room);
        
        // Notify all players if the round has ended
        if(room.game().allPlayersFinishedCurrentRound()) {
            const round = room.game().getCurrentRoundNumber();
            const scores = room.game().getScoresOfCurrentRound();
            socket.emit('round_finished', round, scores);
        }
    }

    socket.on('start_game', startGame);
    socket.on('end_game', endGame);
    socket.on('start_round', startRound);
    socket.on('player_finshed_round', pushAnwsers);
}