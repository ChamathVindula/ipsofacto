const http = require("http");
const express = require("express");
const passport = require("passport");
require("dotenv").config();
const createSocketInstance = require("./config/socket");
const corsMiddleware = require("./middleware/corsMiddleware");
require("./config/passport")(passport); // Initialize passport with the JWT strategy
const { router: authRouter } = require("./routes/auth");
const { router: apiRouter } = require("./routes/api");

// Express app
const app = express();

// Create a Node.JS server
const server = http.createServer(app);
// Call the socket.io configuration function
createSocketInstance(server);
// Use CORS middleware to allow cross-origin requests for development environment
app.use(corsMiddleware);
// Set up the express.json() middleware to parse JSON request bodies
app.use(express.json());
// Initialize passport middleware (A Strategy for JWT authentication has been defined in the config/passport.js file)
app.use(passport.initialize());
// Register authentication route handlers
app.use("/auth", authRouter);
// Register API route handlers
app.use("/api", apiRouter);
// Make the node server listen to traffic on a specified port
server.listen(process.env.PORT || 8001, () => {
    console.log("new server connection");
});