import { DataTypes, Model } from "sequelize";
import connectionDB from "../config/configDB.ts";

class Users extends Model {};

Users.init({
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CIF: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  },
  province: {
    type: DataTypes.STRING
  },
  postalCode: {
    type: DataTypes.STRING
  },
  web: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.ENUM,
    values: ["Restaurante", "Proveedor", "admin"],
    allowNull: false,
    defaultValue: "Restaurante"
  },
  activationCode: {
    type: DataTypes.UUID
  },
  active: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
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
  tableName: "users",
  timestamps: false,
  sequelize: connectionDB
});

export default Users;
