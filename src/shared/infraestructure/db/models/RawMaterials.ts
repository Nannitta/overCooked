import { DataTypes, Model } from "sequelize";
import connectionDB from "../config/configDB.ts";

class RawMaterials extends Model {};

RawMaterials.init({
  rawMaterialTypeId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  typeName: {
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
  tableName: "raw_materials_type",
  timestamps: false,
  sequelize: connectionDB
});

export default RawMaterials;
