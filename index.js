const express = require('express');
const cors = require('cors');
const app = express();
const { getAllBooks, getBookById } = require('./controllers');

// Exercise 1: Retrieve All Books
app.get('/books', async (req, res) => {
  const books = getAllBooks();
  return res.status(200).json({ books });
});

// Exercise 2: Retrieve book by ID
app.get('/books/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const book = getBookById(id);
  return res.status(200).json({ book });
});

module.exports = { app };
