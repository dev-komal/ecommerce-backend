"use strict";
import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
  var Smmi = sequelize.define(
    "Smmi",
    {
      image: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "SMMI Image Is Required" },
        },
      },
    },
    {
      tableName: "smmi",
      updateAt: "update_at",
      createtAT: "created_at",
    }
  );
  return Smmi;
};
