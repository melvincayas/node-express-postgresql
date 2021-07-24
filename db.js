const { Pool } = require("pg");

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "test_datbase",
	port: 5432,
});

module.exports = pool;
