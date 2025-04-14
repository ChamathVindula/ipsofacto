const redisClient = require('../config/redisClient.js');
const Room = require('../services/game/Room');

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
    let room = new Room();
    room.hydrate(room_data);
    return room;
}

/**
 * Persist the game room state to Redis.
 * 
 * @param {Room} room 
 * @returns {boolean}
 */
module.exports.persistRoom = (room) => {
    const ROOM_PREFIX = process.env.REDIS_ROOM_PREFIX || 'ipsft_game_room:';
    const key = `${ROOM_PREFIX}${room.getRoomId()}`;
    redisClient.set(key, JSON.stringify(room.serialise()));
}

/**
 * Retrieve the game room state from Redis.
 * 
 * @param {string} roomId 
 * @returns {Room|null}
 */
module.exports.getRoom = (roomId) => {
    const ROOM_PREFIX = process.env.REDIS_ROOM_PREFIX || 'ipsft_game_room:';

    const key = `${ROOM_PREFIX}${roomId}`;

    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if(err) return reject(err);
            if(!data) return resolve(null);

            try {
                resolve(JSON.parse(data));
            } catch (error) {
                reject(error);
            }
        });
    })
}