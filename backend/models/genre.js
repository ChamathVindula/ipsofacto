"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Genre extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Genre.hasMany(models.Round, {
                sourceKey: "id",
                foreignKey: "genre",
            });
        }
    }
    Genre.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
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
            modelName: "Genre",
            tableName: "Genre", // In case the table name differs from the model name
        }
    );
    return Genre;
};
