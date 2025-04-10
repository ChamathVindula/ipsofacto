const { Server } = require('socket.io');
const registerGameHandlers = require('../handlers/gameHandler');
const registerRoomHandlers = require('../handlers/roomHandler');

module.exports = (httpServer) => {
    // Socket instance
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://127.0.0.1:3000' // Enabled CORS only for development purposes 
        }
    });
    
    const connectionHandler = (socket) => {
        console.log('New event handled');
        // Register all even handlers here
        // Pass the socket and io instance to the event handlers
        registerRoomHandlers(socket, io);
        registerGameHandlers(socket, io);
    }
    
    // Listening in on incoming socket connections
    io.on('connection', connectionHandler);
}