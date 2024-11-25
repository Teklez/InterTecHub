import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const booksRouter = express.Router();

booksRouter.get("/books", async (req, res) => {
  try {
    const books = await prisma.book.findMany({  });
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
    return error;
  }
});
