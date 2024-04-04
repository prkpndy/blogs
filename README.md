This is the code for - **RESTful API with Pagination and Search Functionality**

This is a simple RESTful API for getting, adding, updating and deleting blogs. It has the following endpoints"

- GET `/api/v1/blogs` - This will give you a list of all the blogs in the database in the batches of 10 (PAGINATION). You can pass the following query arguments to the URL:
  - `orderBy` - To specify the order in which the content should be ordered. It can take `title`, `author` and `content` as values. If nothing is provided, it will order the blogs by their `id`.
  - `offset` - To specify the offset for the query. Basically, the page number for pagination. Default value is 0.
  - `content` - This is to specify the query string to search by content.
  - `title` - This is to specify the query string to search by title.
  - `author` - This is to specify the query string to search by author.
  - `all` - This is to specify the query string which will be used to search all the fields. Note that if this is provided, all the other (content, title and all) query strings will be ignored.
- GET `/api/v1/blog/:blogId` - This will give you a specific blogs, if the blog exists. If it does not exist, a 404 error will be given. `blogId` is used to specify the blog you want to get.
- POST `/api/v1/blog` - This will add a new blog in the database. The request accepts a JSON body containing the details of the new blog to be added.
- PATCH `/api/v1/blog/:blogId` - This will update the specified blog. The request accepts a JSON body containing the details of the fields to be updated.
- DELETE `/api/v1/blog/:blogId` - This will delete the specified blog.

In addition to this I have written code to migrate the models to a Postgres database. I have also written the code to populate the database with some initial values. The data is present in `./database/data/blog/blogs.csv`.

# Dependencies

The code depends majorly on the following libraries:

- fastify - Web framework
- sequelize - ORM
- dotenv - To work with environment variables

I have used PostreSQL as a database for the code.

To test the code:

- Install all the dependencies using `npm install`
- Create a `.env` file with the following values:
  - NODE_ENV
  - DB_USER
  - DB_NAME
  - DB_PASSWORD
  - DB_HOST
  - DB_PORT
- Create tables using `npm run sequelize:blog:migrate`
- Populate the tables using `npm run sequelize:blog:seed:all`
- Run the code using `npm run dev`
- Test the code using the files in the `tests` directory. I have not done automated testing.
