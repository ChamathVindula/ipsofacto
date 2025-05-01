"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Game.belongsTo(models.GameType, {
                targetKey: "id",
                foreignKey: "game_type_id",
            });
            Game.hasMany(models.Round, {
                sourceKey: "id",
                foreignKey: "game_id",
            });
        }
    }
    Game.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            game_type_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            start_time: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            end_time: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Game",
            tableName: "Games", // In case the table name differs from the model name
        }
    );
    return Game;
};
