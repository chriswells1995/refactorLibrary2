// we require connection.js
var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

// We declare the ORM class constructor, passing in the connection we defined in connection.js
// The methods of this class all connect to the MySQL databse, using the SQL language, and they are called by the methods in the model files.
//  We have this file so all uses of SQL can be contained to one file. 
class ORM  {
  constructor(connection){
    this.connection = connection
  }
  // this will print one or two question marks depending on weather it's placeholding a collumn or row
  printQuestionMarks(numberOfValuesOrColumns, type){
    const questionMarks = [];

    for (var i = 0; i < numberOfValuesOrColumns; i++) {
      if(type === 'cols'){
        questionMarks.push("??");
      } else {
        questionMarks.push("?")
      } 
    }
    return questionMarks.join(', ');
  }
  // This will fire off when a getAllBooks is called. The inner join allows us to see clearly all of the books and their notes. 
  innerJoin(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol) {
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length, 'cols')} FROM ?? INNER JOIN ?? ON ??.?? = ??.??`;

    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol])
  }
  // This will fire off when a getOneBook or getBookNotes is called. The inner join allows us to see clearly all of the notes for that book. 
  innerJoinOne(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol, bookId){
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length, 'cols')} FROM ?? INNER JOIN ?? ON ??.?? = ??.?? WHERE books.id=?`;

    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol, bookId])
  }
  // This create goes off when AddBook or AddBookNote are called. 
  create(table, columns, values) {
    const queryString = `INSERT INTO ?? (${columns.join(', ')}) VALUES (${this.printQuestionMarks(values.length, 'vals')})`;

    return this.connection.query(queryString, [table, ...values])
  }
// This delete will go off when deleteBookNote is called. 
  delete(table, cols, value){
    const queryString = 'DELETE FROM ?? WHERE ??=?';

    return this.connection.query(queryString, [table, cols, value])
  }
};

module.exports = new ORM(connection);