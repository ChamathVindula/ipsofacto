const { User } = require("../models");
const { Op } = require("sequelize");

module.exports.fetchUserById = async (userId) => {
    try {
        let user = await User.findOne({
            where: {
                id: userId,
            },
            attributes: ["id", "first_name", "last_name", "email"],
        });

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports.fetchUsersById = async (userIds) => {
    try {
        let users = await User.findAll({
            where: {
                id: {
                    [Op.in]: userIds,
                },
            },
            attributes: ["id", "first_name", "last_name", "email"],
        });

        return users;
    } catch (error) {
        throw error;
    }
};