import mysql from "mysql2/promise";
import "dotenv/config";

const { MYSQL_USER, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

interface DbConfig {
  host: string
  user: string
  database: string
  password: string
  timezone: string
}

const dbConfig: DbConfig = {
  host: MYSQL_HOST ?? "",
  user: MYSQL_USER ?? "",
  database: MYSQL_DATABASE ?? "",
  password: MYSQL_PASSWORD ?? "",
  timezone: "local"
};

let pool: mysql.Pool;

export const getPool = (): mysql.Pool => {
  pool = mysql.createPool(dbConfig);
  return pool;
};

export const closePool = async (pool: mysql.Pool): Promise<void> => {
  await pool.end();
};
