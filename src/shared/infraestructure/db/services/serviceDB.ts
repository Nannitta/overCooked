import connectionDB from "../config/configDB.ts";
import Users from "../models/Users.ts";
import Country from "../models/Country.ts";
import Suppliers from "../models/Suppliers.ts";
import { addData } from "../../../../../data-database.ts";

export const testConnection = async (): Promise<void> => {
  try {
    await connectionDB.authenticate();
    console.log(`Connection has been established successfully with ${connectionDB.getDatabaseName()}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const associationsModels = async (): Promise<void> => {
  Users.belongsTo(Country, { foreignKey: "country" });
  await addData();
};

export const syncDB = async (): Promise<void> => {
  await associationsModels();
  await Country.sync({ alter: true });
  await Users.sync({ alter: true });
  await Suppliers.sync({ alter: true });
};
