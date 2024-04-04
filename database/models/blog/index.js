let DataTypes = require("sequelize").DataTypes;

let _Blog = require("./Blog");

function initModels(sequelize) {
  let Blog = _Blog(sequelize, DataTypes);

  return {
    Blog,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
