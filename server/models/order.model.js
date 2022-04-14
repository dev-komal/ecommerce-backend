"use strict";
import Sequelize from "sequelize";

export default (sequelize) => {
  var Order = sequelize.define(
    "Order",
    {
      user_id: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: "User Is Required",
          },
        },
      },
      order_address: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Address Is Required",
          },
        },
      },
      city: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "City Is Required",
          },
        },
      },
      landmark: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Landmark Is Required",
          },
        },
      },
      pincode: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: "Pincode Is Required",
          },
        },
      },
      grand_total: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: "Total Is Required",
          },
        },
      },
      status: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "orders",
      updateAt: "update_at",
      createtAt: "created_at",
    }
  );
  Order.associate = function (models) {
    models.Order.hasMany(models.OrderDetails, {
      as: "OrderDetails",
      foreignKey: "order_id",
    });

    models.Order.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id",
    });
  };

  return Order;
};
