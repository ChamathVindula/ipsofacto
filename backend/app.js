const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
require('dotenv').config();
const sequelize = require('./config/database');
const registerRoomHandlers = require('./handlers/roomHandler');
const registerGameHandlers = require('./handlers/gameHandler');
const redisClient = require('./config/redisClient.js');

// Express app
const app = express();

// Node server
const server = http.createServer(app);

// Socket instance
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:3000' // Enabled CORS only for development purposes 
    }
});

const onConnection = (socket) => {
  // Register all even handlers here
  // Pass the socket and io instance to the event handlers
  registerRoomHandlers(socket, io);
  registerGameHandlers(socket, io);
}

// Listening in on incoming socket connections
io.on('connection', onConnection);

// Temporary route to test the database connection
app.get('/test', (req, res) => {
    sequelize
  .authenticate()
  .then(() => {
    return res.json('Connection has been established successfully.');
  })
  .catch(err => {
    return res.json(`Unable to connect to the database with error: ${err}`);
  });
});

// Make the node server listen to traffic on a specified port 
server.listen(process.env.PORT || 8001, () => {
    console.log('new server connection');
});