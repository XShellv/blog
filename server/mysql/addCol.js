const sequelize = require("./util/database");
const Sequelize = require("sequelize");
const queryInterface = sequelize.getQueryInterface();

const up = function () {
  return Promise.all([
    queryInterface.addColumn("tags", "auth", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }),
  ]);
};

up()