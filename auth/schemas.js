const standardResponse = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
};

const getAuthorSchema = {
  params: {
    type: "object",
    properties: {
      authorId: { type: "string" },
    },
    required: ["authorId"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        authorId: { type: "string" },
        name: { type: "string" },
        occupation: { type: "string" },
        email: { type: "string" },
        joinDate: { type: "string" },
      },
    },
  },
};

const getAuthorsSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        authors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              authorId: { type: "string" },
              name: { type: "string" },
              occupation: { type: "string" },
              email: { type: "string" },
              joinDate: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const loginSchema = {
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["email", "password"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
      required: ["token"],
    },
  },
};

const registerSchema = {
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      name: { type: "string" },
      occupation: { type: "string" },
      password: { type: "string" },
    },
    required: ["email", "password", "name", "occupation"],
  },
  response: { 200: standardResponse },
};

const makeAdminSchema = {
  params: {
    type: "object",
    properties: {
      authorId: { type: "string" },
    },
    required: ["authorId"],
  },
  response: { 200: standardResponse },
};

module.exports = {
  getAuthorSchema,
  getAuthorsSchema,
  loginSchema,
  registerSchema,
  makeAdminSchema,
};
