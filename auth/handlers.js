const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleGetAuthor(req, reply) {
  const authorId = req.params.authorId;

  const author = await this.sequelize.blog.Author.findByPk(authorId);

  if (author) {
    return author.toJSON();
  }

  return reply.status(404).send({ message: "Author does not exist" });
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleGetAuthors(req, reply) {
  const result = await this.sequelize.blog.Author.findAll();
  const data = result.map((author) => author.toJSON());

  return { authors: data };
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleLogin(req, reply) {
  const email = req.body.email;
  const password = req.body.password;

  const author = await this.sequelize.blog.Author.findOne({
    where: { email },
  });

  if (!author) {
    return reply.status(404).send({ message: "Author does not exist" });
  }

  const passwordMatch = await bcrypt.compare(password, author.password);
  if (!passwordMatch) {
    return reply.status(401).send({ error: "Authentication failed" });
  }

  const token = jwt.sign(
    { authorId: author.authorId },
    process.env.JWT_SECRET_TOKEN,
    {
      expiresIn: "1h",
    }
  );

  return { token };
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleRegister(req, reply) {
  const email = req.body.email;

  const author = await this.sequelize.blog.Author.findOne({ where: { email } });

  if (author) {
    return reply.status(400).send({ message: "Email already registered" });
  }

  const data = req.body;
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  await this.sequelize.blog.Author.create(data);

  return { message: "Registration successful" };
}

/**
 *
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleMakeAdmin(req, reply) {
  if (!req.isAdmin) {
    return reply.status(401).send({ message: "Access Denied!" });
  }

  const authorId = req.params.authorId;

  const result = await this.sequelize.blog.Author.update(
    { isAdmin: true },
    { where: { authorId } }
  );

  if (result[0] === 0) {
    return reply.status(404).send({ message: "Author does not exist" });
  }

  return { message: "Author made admin" };
}

module.exports = {
  handleGetAuthor,
  handleGetAuthors,
  handleLogin,
  handleRegister,
  handleMakeAdmin,
};
