"use strict";

import Sequelize from "sequelize";
import Helper from "../common/helper";
import { userRoles, commonStatuses } from "../common/appConstants";

export default (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      user_role_id: {
        type: Sequelize.INTEGER,
        defaultValue: userRoles.USER_ROLE.id,
        validate: {
          notEmpty: "Role is required",
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: { msg: "Valid email address is required" },
          notEmpty: { msg: "Email is required" },
          isUnique: Helper.isUnique("User", "email", {
            msg: "Email already exist",
          }),
        },
      },
      first_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "First name is required" },
        },
      },
      last_name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Last name is required" },
        },
      },
      profile_image: {
        type: Sequelize.STRING,
        default: null,
      },
      address: {
        type: Sequelize.TEXT,
        defaultStatus: null,
      },
      token: {
        type: Sequelize.TEXT,
        defaultStatus: null,
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Password is required" },
        },
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: commonStatuses.ACTIVE.id,
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true,
        validate: {
          notEmpty: { msg: "Phone is required" },
          isUnique: Helper.isUnique("User", "phone", {
            msg: "Phone Number already exist",
          }),
        },
      },
      login_verification_code: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      verification_code_expired_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      created_by: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
    },
    {
      tableName: "users",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );

  // Modal associations

  // User.sync({ force:true });

  return User;
};
