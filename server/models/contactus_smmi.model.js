"use strict";
import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
  var Contactus_smmi = sequelize.define(
    "Contactus_smmi",
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
      tableName: "contactus_smmi",
      updateAt: "update_at",
      createtAT: "created_at",
    }
  );
  return Contactus_smmi;
};
