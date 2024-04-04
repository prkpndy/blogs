const standardResponse = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
};

const getBlogsSchema = {
  query: {
    type: "object",
    properties: {
      orderBy: { type: "string", enum: ["title", "author", "content"] },
      offset: { type: "integer" },
      content: { type: "string" },
      title: { type: "string" },
      author: { type: "string" },
      all: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        blogs: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              authorId: { type: "string" },
              publishDate: { type: "string" },
              title: { type: "string" },
              content: { type: "string" },
            },
            required: ["id", "authorId", "publishDate", "title", "content"],
          },
        },
      },
    },
  },
};

const addBlogSchema = {
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      content: { type: "string" },
    },
    required: ["title", "content"],
  },
  response: {
    200: standardResponse,
  },
};

const getBlogSchema = {
  params: {
    type: "object",
    properties: {
      blogId: { type: "integer" },
    },
    required: ["blogId"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        title: { type: "string" },
        author: { type: "string" },
        content: { type: "string" },
      },
      required: ["title", "author", "content"],
    },
  },
};

const updateBlogSchema = {
  params: {
    type: "object",
    properties: {
      blogId: { type: "integer" },
    },
    required: ["blogId"],
  },
  response: {
    200: standardResponse,
  },
};

const deleteBlogSchema = {
  params: {
    type: "object",
    properties: {
      blogId: { type: "integer" },
    },
    required: ["blogId"],
  },
  response: {
    200: standardResponse,
  },
};

module.exports = {
  getBlogsSchema,
  addBlogSchema,
  getBlogSchema,
  updateBlogSchema,
  deleteBlogSchema,
};
