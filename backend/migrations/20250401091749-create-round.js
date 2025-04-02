'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      game_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Games',
          key: 'id'
        },
        allowNull: false
      },
      difficulty: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Difficulty',
          key: 'id'
        },
        allowNull: false
      },
      genre: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Genre',
          key: 'id'
        },
        allowNull: false
      },
      points_per_question: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rounds');
  }
};