"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      order_number: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING, allowNull: true },
      total_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      total_amount_after_vat: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      item_name: { type: Sequelize.STRING, allowNull: true },
      item_count: { type: Sequelize.INTEGER, allowNull: false },
      people_id: {
        type: Sequelize.INTEGER(11),
        foreignKey: true,
        references: {
          model: "People",
          key: "id",
        },
      },
      created_at: { type: Sequelize.DATE, allowNull: true },
      updated_at: { type: Sequelize.DATE, allowNull: true },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("orders");
  },
};
