const { createRoom: makeRoom, persistRoom, getRoom, hydrateRoom } = require('../utils/gameStateUtils');

module.exports = (socket, io) => {
    /**
     * Create a new game room session.
     * 
     * @param {string} player_id 
     */
    const createRoom = (player_id, room_name) => {
        const newRoom = makeRoom(player_id);    // Create a new game room session
        const roomId = newRoom.getRoomId();
        const roomCode = newRoom.getRoomCode();
        socket.join(roomId);                    // Add the host to the room
        persistRoom(newRoom);                   // Save the room state to Redis
        
        // Emit the room data back to the host
        socket.emit('room_created', {
            roomId: roomId,
            roomName: room_name,
            roomCode: roomCode,
            host: player_id,
            isHost: true,
            players: newRoom.getPlayers()
        });
    }

    /**
     * Add a player to an existing game room session.
     * 
     * @param {string} player_id 
     * @param {string} room_id 
     */
    const joinRoom = (player_id, room_id) => {
        const roomData = getRoom(room_id);

        if(!roomData) {
            socket.emit('room_not_found');
            return;
        }
        const room = hydrateRoom(roomData);     // Create a room instance from the existing room data

        if(room.gameInProgress()) {
            socket.emit('game_in_progress');
            return;
        }

        if(room.playerExists(player_id)) {
            socket.emit('player_already_in_room', room.getPlayers());
            return;
        }
        room.addPlayer(player_id);                                              // Add the player to game state
        socket.join(room.getRoomId());                                          // Add the player to the socket room
        persistRoom(room);                                                      // Save the updated room state to Redis
        socket.to(room.getRoomId()).emit('player_joined', room.getPlayers());   // Emit the updated room data to all other players in the room
        socket.emit('room_joined', room.getPlayers());                          // Emit the updated room data to the joining player
    }

    const leaveRoom = () => {
        //...
    }

    socket.on('create_room', createRoom);
    socket.on('join_room', joinRoom);
    socket.on('leave_room', leaveRoom);
}