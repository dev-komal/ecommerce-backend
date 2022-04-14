"use strict";
import Sequelize from "sequelize";
import Helper from "../common/helper";
export default (sequelize) => {
  var Color = sequelize.define(
    "Color",
    {
      color_name: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notEmpty: { msg: "Color Name Is Required" },
          isUnique: Helper.isUnique("Color", "color_name", {
            msg: "Color already exist",
          }),
        },
      },
    },
    {
      tableName: "colors",
    }
  );
  return Color;
};
