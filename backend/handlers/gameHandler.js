const { getRoom, hydrateRoom, persistRoom } = require('../utils/gameStateUtils');

module.exports = (socket, io) => {
    /**
     * Create a new game and assign it to a specific room.
     * 
     * @param {string} room_id 
     * @param {number} points_per_question 
     * @param {number} number_of_rounds 
     */
    const createGame = async (room_id, points_per_question, number_of_rounds) => {
        const roomData = await getRoom(room_id);
        
        if(!roomData) {
            socket.emit('room_not_found');
            return;
        }
        const room = hydrateRoom(roomData);             // Create a room instance from the existing room data

        if(room.gameInProgress()) {
            return;
        }
        const gameData = {
            status: 'in_progress',
            points_per_question: points_per_question,
            number_of_rounds: number_of_rounds,
            current_round: 0,
            rounds: [],
            players_ready: 0
        }
        room.setGame(gameData);
        persistRoom(room); // Save the updated room state to Redis
        io.to(room.getRoomId()).emit('game_created', room.serialise()); // Notify all players in the room that the game is starting
    }
    
    const endGame = () => {
        //...
    }

    /**
     * Set a player as ready in the game state.
     * If all players are ready, notify all players in the 
     * room that the game is about to start.
     * 
     * @param {string} room_id 
     * @param {string} player_id 
     */
    const playerReady = async (room_id, player_id) => {
        const roomData = await getRoom(room_id);

        if(!roomData) {
            socket.emit('room_not_found');      // Notify the player that the room was not found
            return;
        }
        const room = hydrateRoom(roomData);

        if(!room.playerExists(player_id)) {
            socket.emit('player_not_in_room');  // Notify the player that they are not in the room
            return;
        }
        room.getGame().playerReady();

        persistRoom(room);

        if(room.getGame().allPlayersReady()) {
            const questions = room.getGame().getQuestionsOfCurrentRound();
            // Start the round five seconds after the round is created
            // This ensures that all players start the round at the same time
            const startRoundAt = Date.now() + 5000;
            // Notify all players that the round is starting
            io.to(room.getRoomId()).emit('round_starting', questions, startRoundAt);
        }
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
    const createRound = async (room_id, genre, difficulty, number_of_questions, time_per_question) => {
        const status = 'in_progress';
        const roomData = await getRoom(room_id);

        if(!roomData) {
            socket.emit('room_not_found');
            return;
        }
        const room = hydrateRoom(roomData);
        
        if(!room.gameInProgress()) {
            socket.emit('game_not_in_progress');
            return;
        }
        let roundData = {
            status, 
            genre, 
            difficulty, 
            number_of_questions, 
            time_per_question
        }
        await room.getGame().setRound(roundData);       // Create a new round in the game state
        room.getGame().resetPlayersReady();             // Reset the players ready count for the new round
        persistRoom(room);                              // Save the updated room state to redis
        io.to(room.getRoomId()).emit('round_created');  // Notify all players the round has been created
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
    const pushAnswers = async (room_id, player_id, answers) => {
        const roomData = await getRoom(room_id);

        if(!roomData) {
            socket.emit('room_not_found');
            return;
        }
        const room = hydrateRoom(roomData);

        if(!room.playerExists(player_id)) {
            socket.emit('player_not_in_room');
            return;
        }
        room.getGame().pushPlayerAnswers(player_id, answers);  // Push the player's answers to the game state
        persistRoom(room);
        
        // Notify all players if the round has ended
        if(room.getGame().allPlayersFinishedRound()) {
            const round = room.getGame().getCurrentRoundNumber();
            const scores = room.getGame().getScoresOfCurrentRound();
            io.to(room.getRoomId()).emit('round_finished', round, scores); // Notify all players that the round is finished
        }
    }

    socket.on('create_game', createGame);
    socket.on('end_game', endGame);
    socket.on('create_round', createRound);
    socket.on('player_ready', playerReady);
    socket.on('player_finshed_round', pushAnswers);
}