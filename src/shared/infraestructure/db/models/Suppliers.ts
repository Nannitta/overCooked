import { DataTypes, Model } from "sequelize";
import connectionDB from "../config/configDB.ts";

class Suppliers extends Model {};

Suppliers.init({
  supplierId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  supplierName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CIF: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  web: {
    type: DataTypes.STRING
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
  tableName: "suppliers",
  timestamps: false,
  sequelize: connectionDB
});

export default Suppliers;
