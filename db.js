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
      parcels(
        id serial NOT NULL PRIMARY KEY,
        userId INTEGER NOT NULL,
        status VARCHAR(255) DEFAULT 'Created',
        weight INTEGER NOT NULL,
        receiver_name VARCHAR(255) NOT NULL,
        presentLocation VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        created_order_date TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
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
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        users(
          id serial NOT NULL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_date TIMESTAMP,
          role VARCHAR(255) NOT NULL
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
  const queryText = 'DROP TABLE IF EXISTS parcels returning *';
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

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createParcelTables();
};
/**
   * Drop All Tables
   */
const dropAllTables = () => {
  dropUserTable();
  dropParcelTables();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createParcelTables,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropParcelTables,
  dropAllTables,
};

require('make-runnable');
