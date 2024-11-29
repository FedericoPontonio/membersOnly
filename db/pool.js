const { Pool } = require('pg');

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Important for Neon SSL connection
    },
  });
