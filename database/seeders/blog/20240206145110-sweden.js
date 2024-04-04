const readCsv = require("../../utils/readCsv");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = ["blogs", "authors"];

    for (const i in tables) {
      const rows = await readCsv("blog", tables[i]);
      await queryInterface.bulkInsert(tables[i], rows);
    }
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {},
};
