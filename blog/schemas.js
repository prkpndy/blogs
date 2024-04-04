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
              blogId: { type: "string" },
              authorId: { type: "string" },
              publishDate: { type: "string" },
              title: { type: "string" },
              content: { type: "string" },
            },
            required: ["blogId", "authorId", "publishDate", "title", "content"],
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
      blogId: { type: "string" },
    },
    required: ["blogId"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        title: { type: "string" },
        authorId: { type: "string" },
        content: { type: "string" },
      },
      required: ["title", "authorId", "content"],
    },
  },
};

const updateBlogSchema = {
  params: {
    type: "object",
    properties: {
      blogId: { type: "string" },
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
      blogId: { type: "string" },
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
