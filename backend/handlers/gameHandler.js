const { getRoom, hydrateRoom, persistRoom } = require('../utils/gameStateUtils');

module.exports = (socket, io) => {
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

    const startRound = (room_id, genre, difficulty, number_of_questions, time_per_question) => {
        const status = 'in_progress';
        const roomData = getRoom(room_id);
        
        if(!roomData) {
            socket.emit('room_not_found');
            return;
        }
        const room = hydrateRoom(roomData);
        room.game().createRound(status, genre, difficulty, number_of_questions, time_per_question);

        persistRoom(room); // Save the updated room state to Redis

        const round = room.game().current_round;
        const questions = room.game().getQuestionsOfCurrentRound();
        const startRoundAt = Date.now() + 5000; // Start the round five seconds after the round is created
        socket.emit('start_round', round, startRoundAt, questions); // Notify all players in the room that the round is starting
    }

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

        // Check if all players have finished the round
        if(room.game().allPlayersFinishedCurrentRound()) {
            const round = room.game().current_round;
            const scores = room.game().getScoresOfCurrentRound();
            socket.emit('round_finished', round, scores);   // Notify all players in the room that the round is finished
        }

        persistRoom(room); // Save the updated room state to Redis
    }

    socket.on('start_game', startGame);
    socket.on('end_game', endGame);
    socket.on('start_round', startRound);
    socket.on('push_player_answer', pushPlayerAnswer);
    socket.on('player_finshed_round', pushAnwsers);
}