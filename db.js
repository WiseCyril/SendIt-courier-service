/* eslint-disable no-console */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// created a new instance of pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// listened to pool connect
pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create ParcelOrder Tables
 */
const createParcelTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      parcel(
        id UUID PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'Created',
        parcel_id INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        receiver_name VARCHAR(255) NOT NULL,
        presentLocation VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        created_order_date TIMESTAMP,
        FOREIGN KEY (id) REFERENCES users (parcel_id) ON DELETE CASCADE
        )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Parcel Tables
 */
const dropParcelTables = () => {
  const queryText = 'DROP TABLE IF EXISTS parcel';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        users(
          id UUID PRIMARY KEY,
          email VARCHAR(128) UNIQUE NOT NULL,
          password VARCHAR(128) NOT NULL,
          created_date TIMESTAMP
        )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

module.exports = {
  createParcelTables,
  createUserTable,
  dropParcelTables,
  dropUserTable,
};

require('make-runnable');
