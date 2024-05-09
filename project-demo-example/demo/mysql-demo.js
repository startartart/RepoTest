// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Newtube',
  dateStrings: true,
});

// A simple SELECT query
try {
  const [results, fields] = await connection.query('SELECT * FROM `users`');

  results.forEach((result) => {
    console.log(`result.id => ${result.id}`);
    console.log(`result.name => ${result.name}`);
    console.log(`result.email => ${result.email}`);
    console.log(`result.phone_num => ${result.phone_num}`);
    console.log(`result.created_at => ${result.created_at}\n`);
  })

} catch (err) {
  console.log(err);
}
