const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  abstract: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  next: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  prev: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  post: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  like: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  read: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Post;
