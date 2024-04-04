require("dotenv").config();

const { blog } = require("../../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([blog.Blog.sync()]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  },
};
