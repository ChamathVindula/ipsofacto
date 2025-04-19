const Redis = require('ioredis');
const Warlock = require('node-redis-warlock');

const redis = new Redis();

const warlock = new Warlock(redis);

/**
 * Returns a promise that resolves to a function that can be used to release the lock.
 * 
 * @param {string} key 
 * @param {number} ttl 
 * @returns Promise<function>
 */
module.exports.acquireLock = (key, ttl=5000) => {
    return new Promise((resolve, reject) => {
        warlock.lock(key, ttl, (err, unlock) => {
            if (err) {
                reject(`Error acquiring lock: ${err}`);
            } else {
                resolve(unlock);
            }
        });
    });
}

module.exports.redis = redis;

module.exports.warlock = warlock;