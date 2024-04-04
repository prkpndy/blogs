const fp = require("fastify-plugin");
const jwt = require("jsonwebtoken");

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @param {Object} options
 * @returns
 */
async function adminAuthentication(fastify, options) {
  fastify.decorate("authenticateAdmin", async function (req, reply) {
    const token = req.headers("Authorization");

    if (!token) {
      return reply.status(401).json({ message: "Access denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const authorId = decoded.authorId;

      const author = await this.sequelize.blog.Author.findOne({
        where: { authorId, isAdmin: true },
      });

      if (!author) {
        return reply.status(401).json;
      }

      return;
    } catch (error) {
      reply.status(401).json({ message: "Invalid token" });
    }
  });
}

module.exports = fp(adminAuthentication);
