// We require the express server, the router (used to simplify the API calls), and the Book model to gain access to the Book's methods. 
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// We create two GET methods (one for ALL, one for ONE),
// and one POST method,
//  and pass the request into the model's methods, 
// which pass into the ORM's methods, whcih interact with the databse.
// These API routes are what the front end will interact with.
// We also have catches for potential errors
router.get('/api/books', (req, res) => {
  Book.getAllBooks()
  .then(results => res.json(results))
  .catch(error => res.json(error))
});

router.get('/api/book/:id', (req, res) => {
  const bookId = req.params.id;
  Book.getOneBook(bookId)
  .then(results => res.json(results))
  .catch(error => res.json(error))
})

router.post('/api/book/new', (req, res) => {
  const { title, coverPhoto, authorId } = req.body;

  Book.addBook([title, coverPhoto, authorId])
  .then(() => res.status(200).json(true))
  .catch(error => res.status(500).json(error))
})

module.exports = router;