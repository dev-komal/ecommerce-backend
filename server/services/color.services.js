import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles } from "../common/appConstants";

const _ = { get, Empty, isNull };

// List Colors

const listColors = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const colors = await Models.Color.findAndCountAll({
      attributes: ["id", "color_name"],
      include: [],
      offset: entityPagination.offset,
      limit: entityPagination.limit,
      order: [["createdAt", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((colors || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((colors || {}).rows || []).length || 0;
    pagination["count"] = (colors || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (colors || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// List All colors
const listAllColors = async (req) => {
  let response = statusConst.error;

  try {
    const colors = await Models.Color.findAll({
      attributes: ["id", "color_name"],
      order: [["createdAt", "DESC"]],
    });

    response = { ...statusConst.success, data: colors };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Get Colors Details

const getColorDetail = async (id, tokenUser) => {
  let response = statusConst.error;

  try {
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.id &&
      id != tokenUser.id
    ) {
      return { ...statusConst.forbidden };
    }

    const color = await Models.Color.findOne({
      attributes: ["id", "color_name"],
      where: {
        [Op.and]: {
          id: id,
        },
      },
    });

    if (!color) {
      return { ...statusConst.error, message: "Catgeory not found" };
    }

    response = { ...statusConst.success, data: color };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// Create color

const createColor = async (data) => {
  let response = statusConst.error;

  try {
    const colorPayload = {
      color_name:
        data.color_name[0].toUpperCase() +
          data.color_name.toLowerCase().slice(1) || "",
    };

    // Create new Color entity
    const color = await Models.Color.create(colorPayload, {
      raw: true,
    });

    const colorId = _.get(color, "id", 0);

    // color not created, throw an exception
    if (!colorId) {
      return {
        ...statusConst.error,
        message: "Unable to create a new Color",
      };
    }

    response = {
      ...statusConst.success,
      message: "Color created successfully",
    };
  } catch (error) {
    let errors = {};

    // Default message
    response = { ...statusConst.error, message: error.message };

    try {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          error.name
        )
      ) {
        errors = Helper.formatSequelizeErrors(error);
        response = { ...statusConst.validationErrors, errors };
      }
    } catch (error) {
      response = { ...statusConst.error, message: error.message };
    }
  }

  return response;
};

// Update Color

const updateColor = async (formData, id) => {
  let response = statusConst.error;
  try {
    // Check if Color is authorised or not
    if (formData.user_role_id == userRoles.USER_ROLE.id && id != formData.id) {
      return { ...statusConst.forbidden };
    }

    //Check if Color exist
    const isColor = await Models.Color.findOne({
      where: { id: id },
    });

    if (!isColor) {
      return { ...statusConst.notFound, message: "Color not found" };
    }

    const colorPayload = {
      // color_name: formData.color_name || isColor.color_name,

      color_name:
        formData.color_name[0].toUpperCase() +
          formData.color_name.toLowerCase().slice(1) || isColor.color_name,
    };

    await isColor.update(colorPayload);

    response = {
      ...statusConst.success,
      message: "Color updated successfully",
    };
  } catch (error) {
    let errors = {};

    // Default message
    response = { ...statusConst.error, message: error.message };

    try {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          error.name
        )
      ) {
        errors = Helper.formatSequelizeErrors(error);
        response = { ...statusConst.validationErrors, errors };
      }
    } catch (error) {
      response = { ...statusConst.error, message: error.message };
    }
  }

  return response;
};

// Delete Color

const deleteColor = async (id) => {
  let response = statusConst.error;
  try {
    // Check if Color exist
    const isColor = await Models.Color.findOne({
      where: { id: id },
    });

    if (!isColor) {
      return { ...statusConst.error, message: "Color not found" };
    }

    // Delete Color
    const color = await Models.Color.destroy({
      where: { id: id },
    });

    // Color not deleted? throw an exception
    if (color === 0) {
      return { ...statusConst.success, message: "Color deleted Failed" };
    }

    response = {
      ...statusConst.success,
      message: "Color deleted Successfully",
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Search Color
const searchColor = async (q, entityParams) => {
  let response = statusConst.error;
  try {
    const entityPagination = Helper.dataPagination(entityParams);

    // Search Color
    const color = await Models.Color.findAndCountAll({
      attributes: ["id", "color_name"],
      include: [],
      where: {
        [Op.or]: {
          color_name: { [Op.like]: `%${q}%` },
        },
        // [Op.not]: {
        //   user_role_id: userRoles.ADMIN_ROLE.id,
        // },
      },
      offset: entityPagination.offset,
      limit: entityPagination.limit,
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((color || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((color || {}).rows || []).length || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (color || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const ColorServices = {
  listColors,
  listAllColors,
  getColorDetail,
  createColor,
  updateColor,
  deleteColor,
  searchColor,
};

export default ColorServices;
