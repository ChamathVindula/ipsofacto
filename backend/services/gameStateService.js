import redisClient from '../config/redisClient.js';
import { v4 as uuidv4 } from 'uuid';
import Game from './game/game.js';

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

    hydrate(room) {
        this.roomId = room.roomId;
        this.roomCode = room.roomCode;
        this.host = room.host;
        this.players = room.players;
        this.game = this.setGame(room.game);
    }

    setGame(game) {
        this.game = new Game(game.status, game.points_per_question, game.number_of_rounds, game.current_round, game.rounds);
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

module.exports.createRoom = (host) => {
    return new Room(host);
}

module.exports.hydrateRoom = (room_data) => {
    const room = new Room();

    room.hydrate(roomData);
}

module.exports.persistRoom = (room) => {
    try {
        const ROOM_PREFIX = process.env.REDIS_ROOM_PREFIX || 'ipsft_game_room';
    
        const key = `${ROOM_PREFIX}${room.getRoomId()}`;
    
        redisClient.set(key, JSON.stringify(room.serialise()));

        return true;
    } catch(error) {
        return false;
    }
}

module.exports.getRoom = (roomId) => {
    const ROOM_PREFIX = process.env.REDIS_ROOM_PREFIX || 'ipsft_game_room';

    const key = `${ROOM_PREFIX}${roomId}`;

    return redisClient.get(key);
}