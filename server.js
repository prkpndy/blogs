require("dotenv").config();

const Fastify = require("fastify");

const blogController = require("./blog/controllers");

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

// database
fastify.register(require("./plugins/fastifySequelize"));

// request decorators
// fastify.decorateRequest("state", null);
// fastify.decorateRequest("authInfo", null);

// hooks
fastify.addHook("onRequest", require("./hooks/cors"));

// Controllers
fastify.register(blogController, { prefix: "/api/v1/blogs" });

try {
  fastify.listen({ port: 3000 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
