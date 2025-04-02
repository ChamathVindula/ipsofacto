const Sequelize = require('sequelize');

/**
 * New sequelize connection
 */
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

/**
 * Helper method to close the database connection
 */
exports.closeConnection = () => {
    sequelize.close();
}

module.exports = sequelize;