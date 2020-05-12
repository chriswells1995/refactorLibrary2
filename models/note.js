const orm = require("../config/orm.js");
// We require ORM and call the orm methods to make API calls. These methods pass in all specific information needed to make the API call.
class Note {
  getBookNotes(bookId) {
    return orm.innerJoinOne(['notes.id', 'title', 'note'], 'books', 'notes', 'id', 'bookId', bookId)
  }
  addBookNote(values) {
    return orm.create("notes", ['note', 'bookId'], values)
  }
  deleteBookNote(value) {
    return orm.delete("notes", 'id', value)
  }
};

module.exports = new Note();
