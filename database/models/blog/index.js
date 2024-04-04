let DataTypes = require("sequelize").DataTypes;

let _Blog = require("./Blog");
let _Author = require("./Author");

function initModels(sequelize) {
  let Blog = _Blog(sequelize, DataTypes);
  let Author = _Author(sequelize, DataTypes);

  Blog.belongsTo(Author, { as: "author", foreignKey: "authorId" });
  Author.hasMany(Blog, {
    as: "blog",
    foreignKey: "authorId",
    onDelete: "CASCADE",
  });

  return {
    Blog,
    Author,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
