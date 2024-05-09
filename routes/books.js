const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/get-books-by-author', async (req, res) => {
  const author = req.query.author;
  try {
    const books = await Book.find({ author: author });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add-book', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    quantity: req.body.quantity
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/get-books-by-price', async (req, res) => {
  try {
    const books = await Book.find().sort({ price: -1 }).limit(3);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
