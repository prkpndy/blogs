const fp = require("fastify-plugin");

function fastifySequelizePlugin(fastify) {
  const sequelize = require("../database/models");

  return Promise.all(
    Object.keys(sequelize).map((db) => sequelize[db].sequelize.authenticate())
  ).then(decorate);

  function decorate() {
    fastify.decorate("sequelize", sequelize);
    fastify.addHook("onClose", async (fastifyInstance, done) => {
      for (let db in sequelize) {
        await sequelize[db].sequelize.close();
      }

      done();
    });
  }
}

module.exports = fp(fastifySequelizePlugin);
