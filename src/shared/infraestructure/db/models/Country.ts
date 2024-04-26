import { DataTypes, Model } from "sequelize";
import connectionDB from "../config/configDB.ts";

class Country extends Model {};

Country.init({
  countryName: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  countryCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  countryPhoneCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date()
  },
  modifiedAt: {
    type: DataTypes.DATE,
    defaultValue: null
  }
},
{
  tableName: "countries",
  timestamps: false,
  sequelize: connectionDB
});

export default Country;
