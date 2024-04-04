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
   * 3. all
   *
   * If you have specified all, nothing else will be considered
   * If you have specified nothing, the first PAGINATION_LIMIT blogs will be served
   */
  const PAGINATION_LIMIT = 10;

  const orderBy = req.query.order ?? "blogId";
  const offset = req.query.offset ?? 0;

  const content = req.query.content;
  const title = req.query.title;
  // const author = req.query.author;
  const all = req.query.all;

  const searchObject = {};

  if (all) {
    searchObject[Op.or] = [
      { content: { [Op.iLike]: `%${all}%` } },
      { title: { [Op.iLike]: `%${all}%` } },
      // { author: { [Op.iLike]: `%${all}%` } },
    ];
  } else {
    if (content) {
      searchObject.content = { [Op.iLike]: `%${content}%` };
    }
    if (title) {
      searchObject.title = { [Op.iLike]: `%${title}%` };
    }
    // if (author) {
    //   searchObject.author = { [Op.iLike]: `%${author}%` };
    // }
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
  const authorId = req.authorId;

  const blogData = req.body;

  await this.sequelize.blog.Blog.create({ authorId, ...blogData });

  return { message: "Blog successfully created" };
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleGetBlog(req, reply) {
  const blogId = req.params.blogId;

  const data = await this.sequelize.blog.Blog.findByPk(blogId);

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
  const authorId = req.authorId;

  const blogId = req.params.blogId;
  const newData = req.body;

  const blog = await this.sequelize.blog.Blog.findByPk(blogId);

  if (blog.authorId !== authorId && req.isAdmin === false) {
    return reply.status(404).send({ message: "Blog not found" });
  }

  const result = await this.sequelize.blog.Blog.update(newData, {
    where: { blogId },
  });

  if (result[0] === 0) {
    return reply.status(404).send({ message: "Blog not found" });
  }

  return { message: "Blog updated successfully" };
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleDeleteBlog(req, reply) {
  const authorId = req.authorId;

  const blogId = req.params.blogId;

  const blog = await this.sequelize.blog.Blog.findByPk(blogId);

  if (blog.authorId !== authorId && req.isAdmin === false) {
    return reply.status(404).send({ message: "Blog not found" });
  }

  const result = await this.sequelize.blog.Blog.destroy({
    where: { blogId },
  });

  if (result === 0) {
    return reply.status(404).send({ message: "Blog not found" });
  }

  return { message: "Blog deleted successfully" };
}

module.exports = {
  handleGetBlogs,
  handleAddBlog,
  handleGetBlog,
  handleUpdateBlog,
  handleDeleteBlog,
};
