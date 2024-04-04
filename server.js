require("dotenv").config();

const Fastify = require("fastify");

const blogController = require("./blog/controllers");
const authController = require("./auth/controllers");

const fastify = Fastify({
  logger:
    process.env.NODE_ENV === "development"
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          },
        }
      : true,
  ajv: {
    customOptions: {
      allErrors: true,
    },
  },
});

// plugins
fastify.register(require("./plugins/userAuthentication"));

// database
fastify.register(require("./plugins/fastifySequelize"));

// request decorators
fastify.decorateRequest("isAdmin", null);
fastify.decorateRequest("authorId", null);

// hooks
fastify.addHook("onRequest", require("./hooks/cors"));

// controllers
fastify.register(blogController, { prefix: "/api/v1/blogs" });
fastify.register(authController, { prefix: "/api/v1" });

try {
  fastify.listen({ port: 3000 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
