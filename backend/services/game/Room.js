const Game = require("./Game.js");
const { v4: uuidv4 } = require("uuid");

class Room {
    /**
     * @param {number} host
     */
    constructor(host = null) {
        if (!host) {
            return;
        }
        this.roomId = this.generateRoomId();
        this.roomCode = this.generateRoomCode(this.roomId);
        this.host = host;
        this.players = [host];
        this.game = null;
        return this;
    }

    getRoomId() {
        return this.roomId;
    }

    getRoomCode() {
        return this.roomCode;
    }

    getHost() {
        return this.host;
    }

    getPlayers() {
        return this.players;
    }

    getGame() {
        return this.game;
    }

    gameInProgress() {
        return this.game && this.game.gameInProgress();
    }

    hydrate(room) {
        this.roomId = room.roomId;
        this.roomCode = room.roomCode;
        this.host = room.host;
        this.players = room.players;
        this.game = this.createGame(room.game);
    }

    setGame(game_data) {
        try {
            if (!game_data) {
                throw new Error("Invalid game data");
            }
            this.game = this.createGame(game_data);
        } catch (error) {
            throw error;
        }
    }

    createGame(game_data) {
        if (!game_data) return null;

        return new Game(
            game_data.player_count ?? this.players.length,
            game_data.status,
            game_data.points_per_question,
            game_data.number_of_rounds,
            game_data.current_round,
            game_data.rounds,
            game_data.players_ready
        );
    }

    game() {
        return this.game;
    }

    generateRoomId() {
        return uuidv4();
    }

    generateRoomCode(roomId) {
        // The room id is a uuid, so we can take the third character of each segment
        return roomId
            .split("-")
            .map((segment) => segment[2])
            .join("");
    }

    addPlayer(player) {
        if (isNaN(player)) {
            throw new Error("Invalid player ID");
        }
        this.players.push(player);
    }

    playerExists(player_id) {
        return this.players.some((playerId) => playerId === player_id);
    }

    removePlayer(playerId) {
        this.players = this.players.filter((player) => player.id !== playerId);
    }

    serialise() {
        return {
            roomId: this.roomId,
            roomCode: this.roomCode,
            host: this.host,
            players: this.players,
            game: this.game ? this.game.serialise() : null,
        };
    }
}

module.exports = Room;
