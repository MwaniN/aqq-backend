const pg = require('pg');
const config = require('../config.js');

const client = new pg.Client(config);

let connectIt = async function () {
  // add try / catch for error handling
  await client.connect();
  return `db is connected on ${config.port}`;
}

connectIt().then((data) => {console.log(data)});

async function currDBTest () {
  let result = await client.query('SELECT current_database();')
  return result;
}

module.exports = client;