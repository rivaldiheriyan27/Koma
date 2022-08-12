"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      // define association here
      Categories.hasMany(models.BoardingHouses);
    }
  }
  Categories.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};
