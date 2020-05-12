// We require the express server
const express = require('express');

// we define app as an instance of express
const app = express();
// we define the PORT as either the environment or 8080 
const PORT = process.env.PORT || 8080;

// Middlewear that allows us to pull from the requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Connects us to everything is the public folder
app.use(express.static('public'));

// we connect to our three controller files
app.use(require('./controllers/booksController.js'));
app.use(require('./controllers/notesController.js'));
app.use(require('./controllers/htmlController.js'));

// Our listener which allows us to run the program
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
});