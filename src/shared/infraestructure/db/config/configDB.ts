import { Sequelize } from "sequelize";
import type { Dialect } from "sequelize";
import "dotenv/config";

const { MYSQL_USER, MYSQL_ROOT_PASSWORD, MYSQL_HOST, MYSQL_DATABASE, DB_DIALECT } = process.env;

const connectionDB: Sequelize = new Sequelize(
  MYSQL_DATABASE ?? "",
  MYSQL_USER ?? "",
  MYSQL_ROOT_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: DB_DIALECT as Dialect
  }
);

export default connectionDB;
