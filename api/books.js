import express from "express";
import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";

const prisma = new PrismaClient();

export const booksRouter = express.Router();

// GET all books

booksRouter.get("/books", async (req, res) => {
  try {
    const books = await prisma.book.findMany({});
    if (books) {
      res.json({
        message: "No books found",
      });
    } else {
      res.json({
        books: books,
      });
    }
  } catch (error) {
    return console.error("Error while fetching books:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
});

// POST a book

booksRouter.post(
  "/books",
  // validation chain
  body("title").notEmpty().isLength({ min: 3, max: 30 }),
  body("author").notEmpty().isLength({ min: 3, max: 30 }),
  body("isbn")
    .isISBN()
    .custom(async (value) => {
      const bookExists = await prisma.book.findUnique({
        where: {
          isbn: value,
        },
      });
      if (bookExists) {
        throw new Error("A book with this ISBN already exists.");
      }
    }),
  body("publishedYear").isLength({ min: 4, max: 4 }),

  async (req, res) => {
    // result of validation chain
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await prisma.book.create({
        data: {
          title: req.body.title,
          author: req.body.author,
          isbn: req.body.isbn,
          publishedYear: req.body.publishedYear,
        },
      });

      res.status(201).json({
        message: "The book is successfully created.",
      });
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
