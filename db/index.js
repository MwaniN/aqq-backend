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
    date_joined BIGINT,
    high_score_5 INT DEFAULT 0,
    high_score_10 INT DEFAULT 0,
    high_score_15 INT DEFAULT 0,
    games_played_5 INT DEFAULT 0,
    games_played_10 INT DEFAULT 0,
    games_played_15 INT DEFAULT 0,
    games_played BIGINT DEFAULT 0
    );`)

  // Add new high score columns to existing table if they don't exist
  try {
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS high_score_5 INT DEFAULT 0;`)
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS high_score_10 INT DEFAULT 0;`)
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS high_score_15 INT DEFAULT 0;`)
  } catch (error) {
    console.log('Error adding high score columns:', error)
  }

  // Add new games played columns to existing table if they don't exist
  try {
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS games_played_5 INT DEFAULT 0;`)
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS games_played_10 INT DEFAULT 0;`)
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS games_played_15 INT DEFAULT 0;`)
  } catch (error) {
    console.log('Error adding games played columns:', error)
  }

  await client.query(`CREATE TABLE IF NOT EXISTS quotes (
    id INT PRIMARY KEY,
    quote_body TEXT,
    anime_name VARCHAR(400),
    character_name VARCHAR(400)
    );`)

  await client.query(`CREATE TABLE IF NOT EXISTS users_quotes (
    user_id VARCHAR(200) REFERENCES users (id),
    quote_id INT REFERENCES quotes (id),
    time_added BIGINT,
    primary key (user_id, quote_id)

    );`)

}

CreateTables().then(() => {console.log(`Tables successfully created (or already exist)`)})

module.exports = client;