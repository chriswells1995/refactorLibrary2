// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");
// We require ORM and call the orm methods to make API calls. These methods pass in all specific information needed to make the API call.
class Book {
  getAllBooks() {
    return orm.innerJoin(['books.id', 'firstName', 'lastName', 'title', 'coverPhoto'], 'authors', 'books', 'id', 'authorId')
  }
  getOneBook(bookId){
    return orm.innerJoinOne(['books.id', 'firstName', 'lastName', 'title', 'coverPhoto'], 'authors', 'books', 'id', 'authorId', bookId)
  }
  addBook(values) {
    return orm.create("books", ['title', 'coverPhoto', 'authorId'], values)
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = new Book();
