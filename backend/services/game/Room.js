const Game = require('./game');
const { v4: uuidv4 } = require('uuid');

class Room {
    /**
     * @param {number} host 
     */
    constructor(host = null) {
        if(!host) {
            return;
        }
        this.roomId = this.generateRoomId();
        this.roomCode = this.generateRoomCode(this.roomId);
        this.host = host;
        this.players = [host];
        this.game = null;
    }

    getRoomId() {
        return this.roomId;
    }

    getRoomCode() {
        return this.roomCode;
    }

    getPlayers() {
        return this.players;
    }

    gameInProgress() {
        return this.game && this.game.gameInProgress();
    }

    hydrate(room) {
        this.roomId = room.roomId;
        this.roomCode = room.roomCode;
        this.host = room.host;
        this.players = room.players;
        this.game = this.setGame(room.game);
    }

    setGame(game) {
        this.game = new Game(
            game.player_count ?? this.players.length, game.status, 
            game.points_per_question, game.number_of_rounds, 
            game.current_round, game.rounds);
    }

    game() {
        return this.game;
    }

    generateRoomId() {
        return uuidv4();
    }

    generateRoomCode(roomId) {
        // The room id is a uuid, so we can take the third character of each segment
        return roomId.split('-'),map(segment => segment[2]).join('');
    }

    addPlayer(player) {
        if(NaN(player)) {
            throw new Error('Invalid player ID');
        }
        this.players.push(player);
    }

    playerExists(player_id) {
        return this.players.some(player => player.id === player_id);
    }

    removePlayer(playerId) {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    serialise() {
        return {
            roomId: this.roomId,
            roomCode: this.roomCode,
            host: this.host,
            players: this.players,
            game: this.game.serialise()
        }
    }
}

module.exports = Room;