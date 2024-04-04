const fp = require("fastify-plugin");
const jwt = require("jsonwebtoken");

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @param {Object} options
 * @returns
 */
async function userAuthentication(fastify, options) {
  fastify.decorate("authenticateUser", async function (req, reply) {
    const token = req.headers["authorization"];

    if (!token) {
      return reply.status(401).send({ message: "Access denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      req.authorId = decoded.authorId;

      const author = await this.sequelize.blog.Author.findOne({
        where: { authorId: decoded.authorId, isAdmin: true },
      });

      if (author) {
        req.isAdmin = true;
      } else {
        req.isAdmin = false;
      }

      return;
    } catch (error) {
      return reply.status(401).send({ message: "Invalid token" });
    }
  });
}

module.exports = fp(userAuthentication);
