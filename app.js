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
app.get("/", (req, res) => {
  res.send("<h1/>Welcome to the books API</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    return err;
  }

  console.log(`Server running on port: ${port}`);
});
