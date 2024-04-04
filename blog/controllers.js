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
      preHandler: [],
    },
    handleGetBlogs
  );
  fastify.post(
    "/",
    {
      schema: addBlogSchema,
      preHandler: [],
    },
    handleAddBlog
  );

  fastify.get(
    "/:blogId",
    {
      schema: getBlogSchema,
      preHandler: [],
    },
    handleGetBlog
  );
  fastify.patch(
    "/:blogId",
    {
      schema: updateBlogSchema,
      preHandler: [],
    },
    handleUpdateBlog
  );
  fastify.delete(
    "/:blogId",
    {
      schema: deleteBlogSchema,
      preHandler: [],
    },
    handleDeleteBlog
  );

  done();
}

module.exports = blogController;
