const {
  handleGetAuthor,
  handleGetAuthors,
  handleRegister,
  handleLogin,
  handleMakeAdmin,
} = require("./handlers");
const {
  getAuthorSchema,
  getAuthorsSchema,
  registerSchema,
  loginSchema,
  makeAdminSchema,
} = require("./schemas");

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 * @param {Function} done
 */
function authController(fastify, options, done) {
  fastify.get(
    "/authors",
    {
      schema: getAuthorsSchema,
    },
    handleGetAuthors
  );
  fastify.get(
    "/authors/:authorId",
    {
      schema: getAuthorSchema,
    },
    handleGetAuthor
  );
  fastify.post(
    "/register",
    {
      schema: registerSchema,
    },
    handleRegister
  );
  fastify.post(
    "/login",
    {
      schema: loginSchema,
    },
    handleLogin
  );
  fastify.get(
    "/admin/:authorId",
    {
      schema: makeAdminSchema,
      preHandler: [fastify.authenticateUser],
    },
    handleMakeAdmin
  );

  done();
}

module.exports = authController;
