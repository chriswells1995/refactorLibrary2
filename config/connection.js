// we require mysql to connect to a sql database
const mysql = require('mysql');
// We require util so we can promisify
const util = require('util');

// we create the connection to mysql using my username and password, accessing the library_db databse
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'library_db'
  });
// we catch any errors
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
// we give connection.query access to promises
// i.e. .then() and .catch()
connection.query = util.promisify(connection.query);

module.exports = connection;

// WITHOUT PROMISIFY
// connection.query('SELECT * FROM books', function(err, results){
//   if(err) throw error
//   console.log(results)
// })

// WITH PROMISIFY - provides access to promises and gives us more control
// connection.query('SELECT * FROM books')
//   .then(results => {
//     console.log(results)
//   })
//   .catch(err => console.log(err))