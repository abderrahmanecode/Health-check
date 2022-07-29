/*const {Client} = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});
client.connect();

client.query('SELECT * FROM server', (err, res) => {
  if(!err) {
    console.log(err.rows);
  }
  else {
    console.log(err.message);
  
  }
  client.end;
});
module.exports = client;
*/
