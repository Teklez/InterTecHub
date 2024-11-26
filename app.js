import express from "express";
import dotenv from "dotenv";
import { booksRouter } from "./api/books.js";
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", booksRouter);

// root endpoint
booksRouter.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Books API</h1>
    <p>Here are the available endpoints:</p>
    <ul>
      <li>
        <strong>GET /books</strong><br/>
        Fetch all books from the database.<br/>
        <em>Response:</em>
        <pre>
Status Code: 200 OK
{
  "books": [
    {
      "id": "ID",
      "title": "Book Title",
      "author": "Author Name",
      "isbn": "ISBN",
      "publishedYear": "publishedYear"
    }
  ]
}
        </pre>
      </li>
      <li>
        <strong>POST /books</strong><br/>
        Add a new book to the database.<br/>
        <em>Request Body:</em>
        <pre>
{
  "title": "string",
  "author": "string",
  "isbn": "string",
  "publishedYear": "number"
}
        </pre>
        <em>Response:</em>
        <pre>
Status Code: 201 Created
{
  "message": "The book is successfully created."
}
        </pre>
      </li>
      <li>
        <strong>PUT /books/:id</strong><br/>
        Update a book in the database by its ID.<br/>
        <em>Request Body:</em>
        <pre>
{
  "title": "string",
  "author": "string",
  "isbn": "string",
  "publishedYear": "number"
}
        </pre>
        <em>Response:</em>
        <pre>
Status Code: 200 OK
{
  "message": "The book is successfully updated."
}
        </pre>
      </li>
      <li>
        <strong>DELETE /books/:id</strong><br/>
        Remove a book from the database by its ID.<br/>
        <em>Response:</em>
        <pre>
Status Code: 200 OK
{
  "message": "Book successfully deleted."
}
        </pre>
      </li>
      <li>
        <strong>GET /books/recommendation</strong><br/>
        Get a random book recommendation from the database.<br/>
        <em>Response:</em>
        <pre>
Status Code: 200 OK
{
  "book": {
    "id": "ID",
    "title": "Book Title",
    "author": "Author Name",
    "isbn": "ISBN",
    "publishedYear": "publishedYear"
  }
}
        </pre>
      </li>
    </ul>
  `);
});

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) {
    return err;
  }

  console.log(`Server running on port: ${port}`);
});
