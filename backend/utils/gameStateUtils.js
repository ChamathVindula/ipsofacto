const redisClient = require("../config/redisClient.js");
const Room = require("../services/game/Room");

/**
 * Creates a new game room session.
 *
 * @param {string} host
 * @returns {Room}
 */
module.exports.createRoom = (host) => {
    return new Room(host);
};

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
};

module.exports.generateRoomId = (room_id) => {
    const ROOM_PREFIX = process.env.REDIS_ROOM_PREFIX || "ipsft_game_room:";
    return `${ROOM_PREFIX}${room_id}`;
}

/**
 * Persist the game room state to Redis.
 *
 * @param {Room} room
 * @returns {boolean}
 */
module.exports.persistRoom = (room) => {
    let key = this.generateRoomId(room.getRoomId());
    redisClient.set(key, JSON.stringify(room.serialise()));
};

/**
 * Persist the game room state to Redis in a transaction.
 * 
 * @param {Room} room 
 * @returns {*}
 */
module.exports.persistRoomByTransaction = async (room) => {
    if(!(room instanceof Room)) {
        throw new Error("Expected room to be an instance of Room");
    }
    const key = this.generateRoomId(room.getRoomId());
    const transaction = redisClient.multi();
    transaction.set(key, JSON.stringify(room.serialise()));
    let result = await transaction.exec();
    return result;
}

/**
 * Retrieve the game room state from Redis.
 *
 * @param {string} roomId
 * @returns {Room|null}
 */
module.exports.getRoom = (roomId) => {
    const key = this.generateRoomId(roomId);

    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if (err) return reject(err);
            if (!data) return resolve(null);

            try {
                resolve(JSON.parse(data));
            } catch (error) {
                reject(error);
            }
        });
    });
};

module.exports.setRoomIdToCode = (roomCode, roomId) => {
    if(typeof roomId !== "string" || roomId === "") {
        throw new Error("Invalid roomId");
    }
    if(typeof roomCode !== "string" || roomCode === "") {
        throw new Error("Invalid roomCode");
    }
    const KEY = process.env.REDIS_ROOM_CODES_COLLECTION || "ipsft_game_room_codes";

    redisClient.get(KEY, (err, data) => {
        if(err) {
            throw err;
        }
        data = !data ? {} : JSON.parse(data);
        data[roomCode] = roomId;
        redisClient.set(KEY, JSON.stringify(data));
    });
};

module.exports.getRoomIdFromCode = (roomCode) => {
    if(typeof roomCode !== "string" || roomCode === "") {
        throw new Error("Invalid roomCode");
    }
    const KEY = process.env.REDIS_ROOM_CODES_COLLECTION || "ipsft_game_room_codes";

    return new Promise((resolve, reject) => {
        redisClient.get(KEY, (err, data) => {
            if(err) return reject(err);
            if(!data) return resolve(null);

            try {
                data = JSON.parse(data);
                resolve(data[roomCode] || null);
            } catch (error) {
                reject(error);
            }
        });
    });
}