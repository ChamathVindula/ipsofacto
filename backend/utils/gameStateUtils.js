const redisClient = require('../utils/redisClient');
const Room = require('./game/Room.js');

/**
 * Creates a new game room session.
 * 
 * @param {string} host 
 * @returns 
 */
module.exports.createRoom = (host) => {
    return new Room(host);
}

/**
 * Create a new game room session with existing game state data.
 * 
 * @param {string} room_data 
 * @returns {Room}
 */
module.exports.hydrateRoom = (room_data) => {
    return new Room().hydrate(room_data);
}

/**
 * Persist the game room state to Redis.
 * 
 * @param {Room} room 
 * @returns {boolean}
 */
module.exports.persistRoom = (room) => {
    try {
        const ROOM_PREFIX = process.env.REDIS_ROOM_PREFIX || 'ipsft_game_room:';
    
        const key = `${ROOM_PREFIX}${room.getRoomId()}`;
    
        redisClient.set(key, JSON.stringify(room.serialise()));

        return true;
    } catch(error) {
        return false;
    }
}

/**
 * Retrieve the game room state from Redis.
 * 
 * @param {string} roomId 
 * @returns {Room|null}
 */
module.exports.getRoom = (roomId) => {
    try {
        const ROOM_PREFIX = process.env.REDIS_ROOM_PREFIX || 'ipsft_game_room:';
    
        const key = `${ROOM_PREFIX}${roomId}`;
    
        return redisClient.get(key);
    } catch(error) {
        return null;
    }
}