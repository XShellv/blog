const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const queryInterface = sequelize.getQueryInterface()

const addCol = () => {
    queryInterface.addColumn("posts", "status", {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "draft"
    })
}
addCol()