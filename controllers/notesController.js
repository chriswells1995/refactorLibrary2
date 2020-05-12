// We require the express server, the router (used to simplify the API calls), and the Book model to gain access to the Book's methods. 
const express = require('express');
const router = express.Router();
const Note = require('../models/note');
// We create two GET methods (one for ALL, one for ONE),
// one POST method, and one DELETE method. 
//  and pass the request into the model's methods, 
// which pass into the ORM's methods, whcih interact with the databse.
// These API routes are what the front end will interact with.
// We also have catches for potential errors
router.get('/api/book/notes/:id', (req, res) => {
  const bookId = req.params.id;

  Note.getBookNotes(bookId)
  .then(results => res.json(results))
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
});

router.post('/api/book/note', (req, res) => {
  const { note, bookId } = req.body;
  
  Note.addBookNote([note, bookId])
  .then(() => res.status(200).json(true))
  .catch(error => res.status(500).json(error))
});

router.delete('/api/note/:id', (req, res) => {
  Note.deleteBookNote(req.params.id)
  .then(() => res.status(200).json(true))
  .catch(error => res.status(500).json(error))
});

module.exports = router;