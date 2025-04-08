const http = require('http');
const express = require('express');
require('dotenv').config();
const createSocketInstance = require('./config/socket');
const corsMiddleware = require('./middleware/corsMiddleware');

// Express app
const app = express();

// Node server
const server = http.createServer(app);

// Call the socket.io configuration function
createSocketInstance(server);

// Use CORS middleware to allow cross-origin requests for dev environment
app.use(corsMiddleware);

// Make the node server listen to traffic on a specified port 
server.listen(process.env.PORT || 8001, () => {
    console.log('new server connection');
});