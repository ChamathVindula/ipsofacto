const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
require('dotenv').config();
const sequelize = require('./config/database');
const { Game, Round } = require('./models');

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

// Listening in on incoming socket connections
io.on('connection', (socket) => {
    console.log('A user just connected');

    socket.on('disconnect', () => {
        console.log('A user just disconnected');
    })
});

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