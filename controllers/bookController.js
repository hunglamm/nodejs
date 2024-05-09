const Book = require('../models/book');

exports.getBooksByAuthor = async (req, res) => {
  try {
    const author = req.query.author;
    const books = await Book.find({ author });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sách' });
  }
};

exports.addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json({ message: 'Thêm sách thành công' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Lỗi khi thêm sách' });
  }
};

exports.getBooksByPrice = async (req, res) => {
  try {
    const books = await Book.find().sort({ price: -1 }).limit(3);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy sách theo giá' });
  }
};
