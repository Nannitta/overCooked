import { Sequelize } from "sequelize";
import type { Dialect } from "sequelize";
import "dotenv/config";

const { MYSQL_USER, MYSQL_ROOT_PASSWORD, MYSQL_HOST, MYSQL_DATABASE, DB_DIALECT } = process.env;

const connectionDB: Sequelize = new Sequelize(
  "",
  MYSQL_USER ?? "root",
  MYSQL_ROOT_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: DB_DIALECT as Dialect
  }
);

export const createDatabaseIfNotExists = async (): Promise<void> => {
  try {
    await connectionDB.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};`);
    console.log(`Database ${MYSQL_DATABASE} created successfully or already exists.`);
    await connectionDB.query(`USE ${MYSQL_DATABASE};`);
    console.log(`Database ${MYSQL_DATABASE} in use`);
  } catch (error) {
    console.error("Error creating database:", error);
  }
};

export default connectionDB;
