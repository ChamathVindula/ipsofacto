const {
    createRoom: makeRoom,
    persistRoom,
    getRoom,
    hydrateRoom,
    setRoomIdToCode,
    getRoomIdFromCode,
} = require("../utils/gameStateUtils");
const {
    fetchUsersById: fetchUsers,
    fetchUserById: fetchUser,
} = require("../utils/user");

module.exports = (socket, io) => {
    /**
     * Create a new game room session.
     *
     * @param {string} player_id
     */
    const createRoom = async (player_id, room_name) => {
        const newRoom = makeRoom(player_id); // Create a new game room session
        const roomId = newRoom.getRoomId();
        const roomCode = newRoom.getRoomCode();
        socket.join(roomId); // Add the host to the room
        persistRoom(newRoom); // Save the room state to Redis
        setRoomIdToCode(roomCode, roomId); // Save the room id against the room code in Redis

        // Emit the room data back to the host
        socket.emit("room_created", {
            roomId: roomId,
            roomName: room_name,
            roomCode: roomCode,
            host: player_id,
            isHost: true,
            players: await fetchUsers(newRoom.getPlayers()),
        });
    };

    /**
     * Add a player to an existing game room session.
     *
     * @param {string} player_id
     * @param {string} room_id
     */
    const joinRoom = async (player_id, room_code) => {
        const room_id = await getRoomIdFromCode(room_code); // Get the room id from the room code
        const roomData = await getRoom(room_id);

        if (!roomData) {
            socket.emit("room_not_found");
            return;
        }
        const room = hydrateRoom(roomData); // Create a room instance from the existing room data

        if (room.gameInProgress()) {
            socket.emit("game_in_progress"); // Notify the player that the game is in progress
            return;
        }

        if (room.playerExists(player_id)) {
            socket.emit("player_in_room", room.getPlayers());
            return;
        }
        room.addPlayer(player_id); // Add the player to game state
        socket.join(room.getRoomId()); // Add the player to the socket room
        persistRoom(room); // Save the updated room state to redis
        socket
            .to(room.getRoomId())
            .emit("player_joined", await fetchUser(player_id)); // Emit the new player to the room

        socket.emit("room_joined", {
            roomId: room.getRoomId(),
            roomName: "N/A",
            roomCode: room.getRoomCode(),
            host: room.getHost(),
            isHost: false,
            players: await fetchUsers(room.getPlayers()),
        }); // Emit the room data back to the player
    };

    const leaveRoom = () => {
        //...
    };

    socket.on("create_room", createRoom);
    socket.on("join_room", joinRoom);
    socket.on("leave_room", leaveRoom);
};
