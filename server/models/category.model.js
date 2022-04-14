"use strict";
import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
  var Category = sequelize.define(
    "Category",
    {
      category_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Category Name Is Required" },
        },
      },
      description: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Description Is Required" },
        },
      },
      category_image: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Category Image Is Required" },
        },
      },
    },
    {
      tableName: "categories",
      updateAt: "update_at",
      createtAT: "created_at",
    }
  );
  return Category;
};
