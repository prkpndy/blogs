const Sequelize = require("sequelize");
const config = require("../config/config");

const sequelizeBlog = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  config.blog
);

const blog = require("./blog")(sequelizeBlog);

Object.keys(blog).forEach((modelName) => {
  if (blog[modelName].associate) {
    blog[modelName].associate(blog);
  }
});

blog.sequelize = sequelizeBlog;
blog.Sequelize = Sequelize;

module.exports = { blog };
