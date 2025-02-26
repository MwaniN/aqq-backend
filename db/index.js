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

async function CreateTables() {
  await client.query(`CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(200) PRIMARY KEY,
    email VARCHAR(100),
    date_joined TIMESTAMPTZ
    );`)

  await client.query(`CREATE TABLE IF NOT EXISTS quotes (
    id INT PRIMARY KEY,
    quote_body TEXT,
    anime_name VARCHAR(400),
    character_name VARCHAR(400)
    );`)

  await client.query(`CREATE TABLE IF NOT EXISTS users_quotes (
    user_id VARCHAR(200) REFERENCES users (id),
    quote_id INT REFERENCES quotes (id),
    time_added TIMESTAMPTZ,
    primary key (user_id, quote_id)

    );`)

}

CreateTables().then(() => {console.log(`Tables successfully created (or already exist)`)})

module.exports = client;