const cors = require('cors');

const corsOptions = {
    origin: 'http://127.0.0.1:3000', // The React app URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

module.exports = cors(corsOptions);