import { DataTypes, Model } from "sequelize";
import connectionDB from "../config/configDB.ts";

class Allergens extends Model {};

Allergens.init({
  allergenId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  allergenName: {
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
  tableName: "allergens",
  timestamps: false,
  sequelize: connectionDB
});

export default Allergens;
