"use strict";
import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
  var Product = sequelize.define(
    "Product",
    {
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Product name is required" },
        },
      },
      product_image: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Product image is required" },
        },
      },

      description: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Product description is required" },
        },
      },

      price: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Product price is required" },
        },
      },
      length: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Product length is required" },
        },
      },
      type: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Product type is required" },
        },
      },
      quantity: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Product Quantity is required" },
        },
      },
      status: {
        type: Sequelize.BOOLEAN,
        validate: {
          notEmpty: { msg: "Product Status is required" },
        },
      },
    },
    {
      tableName: "products",
      updateAt: "update_at",
      createtAT: "created_at",
    }
  );

  Product.associate = function (models) {
    models.Product.belongsTo(models.Category, {
      as: "Category",
      foreignKey: "category_id",
    });
    models.Product.belongsTo(models.Color, {
      as: "Color",
      foreignKey: "color_id",
    });
  };

  return Product;
};
