"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Round extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Round.belongsTo(models.Difficulty, {
                targetKey: "id",
                foreignKey: "difficulty",
            });
            Round.belongsTo(models.Genre, {
                targetKey: "id",
                foreignKey: "genre",
            });
            Round.belongsTo(models.Game, {
                targetKey: "id",
                foreignKey: "game_id",
            });
            Round.belongsToMany(models.User, {
                through: models.Participant,
                foreignKey: "round_id",
                otherKey: "user_id",
                as: "Participants",
            });
        }
    }
    Round.init(
        {
            game_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            difficulty: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            genre: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            points_per_question: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: true,
                },
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
            modelName: "Round",
            tableName: "Rounds", // In case the table name differs from the model name
        }
    );
    return Round;
};
