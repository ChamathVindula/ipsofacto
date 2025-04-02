'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Difficulty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Difficulty.hasMany(models.Round, { sourceKey: 'id', foreignKey: 'difficulty' });
    }
  }
  Difficulty.init({
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Difficulty',
    tableName: 'Difficulty' // In case the table name differs from the model name
  });
  return Difficulty;
};