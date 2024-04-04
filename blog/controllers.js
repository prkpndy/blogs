const {
  handleGetBlogs,
  handleAddBlog,
  handleGetBlog,
  handleUpdateBlog,
  handleDeleteBlog,
} = require("./handlers");
const {
  getBlogsSchema,
  addBlogSchema,
  getBlogSchema,
  updateBlogSchema,
  deleteBlogSchema,
} = require("./schemas");

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 * @param {Function} done
 */
function blogController(fastify, options, done) {
  fastify.get(
    "/",
    {
      schema: getBlogsSchema,
    },
    handleGetBlogs
  );
  fastify.post(
    "/",
    {
      schema: addBlogSchema,
      preHandler: [fastify.authenticateUser],
    },
    handleAddBlog
  );

  fastify.get(
    "/:blogId",
    {
      schema: getBlogSchema,
    },
    handleGetBlog
  );
  fastify.patch(
    "/:blogId",
    {
      schema: updateBlogSchema,
      preHandler: [fastify.authenticateUser],
    },
    handleUpdateBlog
  );
  fastify.delete(
    "/:blogId",
    {
      schema: deleteBlogSchema,
      preHandler: [fastify.authenticateUser],
    },
    handleDeleteBlog
  );

  done();
}

module.exports = blogController;
