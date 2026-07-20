// Database variable creation
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export default new pg.Pool({
	user: "postgres",
	host: "localhost",
	database: process.env.DB_DATABASE_NAME,
	password: process.env.DB_PASSWORD,
	port: 5432
})