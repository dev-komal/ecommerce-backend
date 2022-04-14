"use strict";
import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
  var ContactUs = sequelize.define(
    "ContactUs",
    {
      fullname: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Full Name Is Required" },
        },
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Email Is Required" },
        },
      },
      message: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Message Is Required" },
        },
      },
    },
    {
      tableName: "contact_us",
      updateAt: "update_at",
      createtAT: "created_at",
    }
  );
  return ContactUs;
};
