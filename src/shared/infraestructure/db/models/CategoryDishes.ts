import { DataTypes, Model } from "sequelize";
import connectionDB from "../config/configDB.ts";

class CategoryDishes extends Model {};

CategoryDishes.init({
  categoryDishId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  costPerCent: {
    type: DataTypes.DECIMAL,
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
  tableName: "category_dishes",
  timestamps: false,
  sequelize: connectionDB
});

export default CategoryDishes;
