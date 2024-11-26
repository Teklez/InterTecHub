# Book Management API

This is a simple Book Management API built with **Express.js**, **PostgreSQL**, and **Prisma ORM**. It supports CRUD operations and includes custom endpoints for additional functionality.

## Features

- Fetch all books from the database.
- Add a new book to the database with validation.
- Update book details by ID with validation.
- Remove a book from the database by ID.
- Suggests a random book from your collection.


---

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- PostgreSQL database instance running.

### Add configuration file
Add the following variables in the .env in the root of the app
- DATABASE_URL
- DIRECT_URL
- PORT

---

### Setup

1. **Clone the Repository**
   ```bash
   git clone 
   cd InterTecHub
2. **Install dependencies**
   ```bash
   npm install
   npx prisma db generate
3. **Start the application**
   ```bash
   npm start

you can now access the app on http://localhost:PORT/



