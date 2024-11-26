import express from "express";
import { PrismaClient } from "@prisma/client";
import { body, param, validationResult } from "express-validator";

const prisma = new PrismaClient();

export const booksRouter = express.Router();

// GET all books

booksRouter.get("/books", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    if (!books) {
      res.json({
        message: "No books found",
      });
    } else {
      res.status(200).json({
        books: books,
      });
    }
  } catch (error) {
    console.error("Error while fetching books:", error);
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
    .notEmpty()
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
  body("publishedYear")
    .notEmpty()
    .isLength({ min: 4, max: 4 })
    .custom((value) => {
      const currentYear = new Date().getFullYear();
      if (parseInt(value) > currentYear) {
        throw new Error("Published year cannot be in the future.");
      }
    }),

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

// UPDATE book by id
booksRouter.put(
  "/books/:id",
  // validation chain
  body("title").optional().isLength({ min: 3, max: 30 }),
  body("author").optional().isLength({ min: 3, max: 30 }),
  body("isbn").optional().isISBN(),
  body("publishedYear").optional().isLength({ min: 4, max: 4 }),
  param("id")
    .notEmpty()
    .custom(async (value, { req }) => {
      const bookExists = await prisma.book.findUnique({
        where: {
          id: parseInt(value),
        },
      });
      if (!bookExists) {
        throw new Error("A book with this id doesn't exists.");
      }

      // if books exists, add the fields to the req.body that are empty in the request body
      if (!req.body.title) {
        req.body.title = bookExists.title;
      }
      if (!req.body.author) {
        req.body.author = bookExists.author;
      }
      if (!req.body.isbn) {
        req.body.isbn = bookExists.isbn;
      }
      if (!req.body.publishedYear) {
        req.body.publishedYear = bookExists.publishedYear;
      }
    }),

  async (req, res) => {
    // result of validation chain
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await prisma.book.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          title: req.body.title,
          author: req.body.author,
          isbn: req.body.isbn,
          publishedYear: req.body.publishedYear,
        },
      });

      res.status(200).json({
        message: "The book is successfully Updated.",
      });
    } catch (error) {
      console.error("Error Updating book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE book with specified id

booksRouter.delete(
  "/books/:id",
  param("id")
    .notEmpty()
    .custom(async (value) => {
      const bookExists = await prisma.book.findUnique({
        where: {
          id: parseInt(value),
        },
      });
      if (!bookExists) {
        throw new Error("A book with this id doesn't exists.");
      }
    }),
  async (req, res) => {
    // result of validation chain
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await prisma.book.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      res.status(200).json({
        message: "Book successfully deleted.",
      });
    } catch (error) {
      console.error("Error while deleting book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

booksRouter.get("/books/recommendation", async (req, res) => {
  try {
    const books = await prisma.book.findMany();

    if (!books) {
      res.json({
        message: "No books found",
      });
    } else {
      const randomIndex = Math.floor(Math.random() * books.length);
      res.status(200).json({
        book: books[randomIndex],
      });
    }
  } catch (error) {
    console.error("Error while fetching books:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
