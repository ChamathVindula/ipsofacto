const { createClient } = require('redis');

const client = await createClient()
    .on('error', err => console.log('Could not establish a redis connection', err))
    .connect();

module.exports = client;