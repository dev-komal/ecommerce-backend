"use strict";
import Sequelize from "sequelize";

export default (sequelize, DataTypes) => {
  var Banner = sequelize.define(
    "Banner",
    {
      banner_image: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Banner Image Is Required" },
        },
      },
      banner_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Banner Name Is Required" },
        },
      },
    },
    {
      tableName: "banners",
      updateAt: "update_at",
      createtAT: "created_at",
    }
  );
  return Banner;
};
