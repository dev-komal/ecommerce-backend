"use strict";
import Sequelize from "sequelize";

export default (sequelize) => {
  var OrderDetails = sequelize.define(
    "OrderDetails",
    {
      order_id: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: "Order Is Required",
          },
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: "Product Is Required",
          },
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: "Quantity Is Required",
          },
        },
      },
    },
    {
      tableName: "order_details",
      updateAt: "update_at",
      createtAT: "created_at",
    }
  );
  OrderDetails.associate = function (models) {
    models.OrderDetails.belongsTo(models.Order, {
      as: "Order",
      foreignKey: "order_id",
    });

    models.OrderDetails.belongsTo(models.Product, {
      as: "Product",
      foreignKey: "product_id",
    });
  };

  return OrderDetails;
};
