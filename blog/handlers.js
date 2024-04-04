const { Op } = require("sequelize");

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleGetBlogs(req, reply) {
  /**
   * You can have the following 4 query parameters:
   * 1. content
   * 2. title
   * 3. author
   * 4. all
   *
   * If you have specified all, nothing else will be considered
   * If you have specified nothing, the first PAGINATION_LIMIT blogs will be served
   */
  const PAGINATION_LIMIT = 10;

  const orderBy = req.query.order ?? "id";
  const offset = req.query.offset ?? 0;

  const content = req.query.content;
  const title = req.query.title;
  const author = req.query.author;
  const all = req.query.all;

  const searchObject = {};

  if (all) {
    searchObject[Op.or] = [
      (searchObject.content = { [Op.iLike]: `%${all}%` }),
      (searchObject.title = { [Op.iLike]: `%${all}%` }),
      (searchObject.author = { [Op.iLike]: `%${all}%` }),
    ];
  } else {
    if (content) {
      searchObject.content = { [Op.iLike]: `%${content}%` };
    }
    if (title) {
      searchObject.title = { [Op.iLike]: `%${title}%` };
    }
    if (author) {
      searchObject.author = { [Op.iLike]: `%${author}%` };
    }
  }

  const result = await this.sequelize.blog.Blog.findAll({
    order: [orderBy],
    where: searchObject,
    limit: PAGINATION_LIMIT,
    offset: offset * PAGINATION_LIMIT,
  });

  const data = result.map((product) => product.toJSON());

  return { blogs: data };
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleAddBlog(req, reply) {
  const blogData = req.body;

  await this.sequelize.blog.Blog.create(blogData);

  return { message: "Blog successfully created" };
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleGetBlog(req, reply) {
  const blogId = req.params.blogId;

  const data = this.sequelize.blog.Blog.findByPk(blogId);

  if (data) {
    return data.toJSON();
  } else {
    return reply.status(404).send({ message: "Blog not found" });
  }
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleUpdateBlog(req, reply) {
  const blogId = req.params.blogId;
  const newData = req.body;

  // TODO: Check the result format
  const result = await this.sequelize.blog.Blog.update(newData, {
    where: { id: blogId },
  });

  console.log(result);

  return { message: "Blog updated successfully" };
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleDeleteBlog(req, reply) {
  const blogId = req.params.blogId;

  // TODO: Check the result format
  const result = await this.sequelize.blog.Blog.destroy({
    where: { id: blogId },
  });

  console.log(result);

  return { message: "Blog deleted successfully" };
}

module.exports = {
  handleGetBlogs,
  handleAddBlog,
  handleGetBlog,
  handleUpdateBlog,
  handleDeleteBlog,
};
