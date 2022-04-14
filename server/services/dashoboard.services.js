import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import { get, Empty, isNull } from "lodash";
import Sequelize from "sequelize";

const _ = { get, Empty, isNull };
const countProducts = async (req) => {
  let response = statusConst.error;

  try {
    const products = await Models.Product.count({
      attributes: ["id"],

      // count: ["id", "COUNT"],
    });

    response = { ...statusConst.success, data: products };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const countUsers = async (req) => {
  let response = statusConst.error;

  try {
    const products = await Models.User.count({
      attributes: ["id"],

      // count: ["id", "COUNT"],
    });

    response = { ...statusConst.success, data: products };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};
const Dashboardservices = {
  countProducts,
  countUsers,
};

export default Dashboardservices;
