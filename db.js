const { Pool } = require("pg");

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "test_database",
	port: 5432,
});

module.exports = pool;
