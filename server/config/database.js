const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms));
}
async function initDatabase() {
  const maxAttempts = 20; // Adjust as needed
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {

      const client = await pool.connect(); // Establish a database connection

      // Check if the database system is ready
      const { rows } = await client.query('SELECT 1');
      if (rows[0].result === 1) {
        // The database is ready, execute the initialization script
        const initScriptPath = path.join(__dirname, 'initDB.sql');
        const initScript = fs.readFileSync(initScriptPath, 'utf8');
        await client.query(initScript);
        client.release(); // Release the database connection
        console.log('Database initialized successfully.');
        return; // Exit the retry loop
      }

      client.release(); // Release the database connection
    } catch (error) {
      console.log(attempts);
      console.error('Error initializing database:', error);
    }

    attempts++;
    await sleep(1000);
  }

  console.error('Max retry attempts reached. Unable to initialize the database.');
}

module.exports = { pool, initDatabase };

