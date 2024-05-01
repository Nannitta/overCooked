import connectionDB from "../config/configDB.ts";
import Users from "../models/Users.ts";
import Country from "../models/Country.ts";
import Suppliers from "../models/Suppliers.ts";
import Allergens from "../models/Allergens.ts";
import CategoryDishes from "../models/CategoryDishes.ts";
import RawMaterials from "../models/RawMaterials.ts";

export const testConnection = async (): Promise<void> => {
  try {
    const { MYSQL_DATABASE } = process.env;

    await connectionDB.authenticate();
    console.log(`Connection has been established successfully with ${MYSQL_DATABASE}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const associationsModels = async (): Promise<void> => {
  Users.belongsTo(Country, { foreignKey: "country" });
};

export const syncDB = async (): Promise<void> => {
  await associationsModels();
  await Country.sync({ alter: true });
  await Users.sync({ alter: true });
  await Suppliers.sync({ alter: true });
  await Allergens.sync({ alter: true });
  await CategoryDishes.sync({ alter: true });
  await RawMaterials.sync({ alter: true });
};
