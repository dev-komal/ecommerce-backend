import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles, SMMI } from "../common/appConstants";

const _ = { get, Empty, isNull };

// List SMMI

const listSmmi = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const smmi = await Models.Smmi.findAndCountAll({
      attributes: ["id", "image"],
      include: [],

      offset: entityPagination.offset,
      limit: entityPagination.limit,
      order: [["createdAt", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((smmi || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((smmi || {}).rows || []).length || 0;
    pagination["count"] = (smmi || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (smmi || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// List All Smmi
const listAllSmmi = async (req) => {
  let response = statusConst.error;

  try {
    const smmi = await Models.Smmi.findAll({
      attributes: ["id", "image"],

      order: [["createdAt", "DESC"]],
    });

    response = { ...statusConst.success, data: smmi };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Get SMMI Details

const getSmmiDetail = async (id, tokenUser) => {
  let response = statusConst.error;

  try {
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.id &&
      id != tokenUser.id
    ) {
      return { ...statusConst.forbidden };
    }

    const smmi = await Models.Smmi.findOne({
      attributes: ["id", "image"],
      where: {
        [Op.and]: {
          id: id,
        },
      },
    });

    if (!smmi) {
      return { ...statusConst.error, message: "SMMI not found" };
    }

    response = { ...statusConst.success, data: smmi };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// Create Smmi

const createSmmi = async (req) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.image;
    fileName = `smmi-${Date.now().toString()}.${
      (file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
    }`;
    filePath = `${SMMI}${fileName}`;

    // Move smmi image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        console.log("ERROR -------------------", err);
        responseData = { ...statusConst.error, message: "Upload Image Failed" };
        fileName = "";
      }
    });
  }

  try {
    // Check if smmi is authorised or not
    if (data.user_role_id == userRoles.USER_ROLE.id && id != data.id) {
      return { ...statusConst.forbidden };
    }

    const smmiPayload = {
      image: fileName,
    };

    // Create new smmi entity
    const smmi = await Models.Smmi.create(smmiPayload, {
      raw: true,
    });

    const smmiId = _.get(smmi, "id", 0);

    // smmi not created, throw an exception
    if (!smmiId) {
      return {
        ...statusConst.error,
        message: "Unable to create a new SMMI Image",
      };
    }

    response = {
      ...statusConst.success,
      message: "Smmi Image created successfully",
    };
  } catch (error) {
    let errors = {};

    // Default message
    response = {
      ...statusConst.error,
      message: error.message,
    };

    try {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          error.name
        )
      ) {
        errors = Helper.formatSequelizeErrors(error);
        response = {
          ...statusConst.validationErrors,
          errors,
        };
      }
    } catch (error) {
      response = {
        ...statusConst.error,
        message: error.message,
      };
    }
  }

  return response;
};

// Update Smmi

const updateSmmi = async (req, id) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.image;
    fileName = `smmi-${Date.now().toString()}.${
      (file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
    }`;
    filePath = `${SMMI}${fileName}`;

    // Move smmi image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error, message: "Update Image Failed" };
        fileName = "";
      }
    });
  }

  try {
    // Check if smmi is authorised or not
    if (data.user_role_id == userRoles.USER_ROLE.id && id != data.id) {
      return { ...statusConst.forbidden };
    }

    //Check if smmi exist
    const isSmmi = await Models.Smmi.findOne({
      where: { id: id },
    });

    if (!isSmmi) {
      return { ...statusConst.notFound, message: "SMMI  not found" };
    }

    const smmiPayload = {
      image: fileName,
    };

    await isSmmi.update(smmiPayload);

    response = {
      ...statusConst.success,
      message: "SMMI updated successfully",
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

// Delete Smmi

const deleteSmmi = async (id) => {
  let response = statusConst.error;
  try {
    // Check if Smmi exist
    const isSmmi = await Models.Smmi.findOne({
      where: { id: id },
    });

    if (!isSmmi) {
      return { ...statusConst.error, message: "Smmi not found" };
    }

    // Delete Smmi
    const Smmi = await Models.Smmi.destroy({
      where: { id: id },
    });

    // Smmi not deleted? throw an exception
    if (Smmi === 0) {
      return { ...statusConst.success, message: "Smmi deleted Failed" };
    }

    response = {
      ...statusConst.success,
      message: "Smmi deleted Successfully",
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const SmmiServices = {
  listSmmi,
  listAllSmmi,
  getSmmiDetail,
  createSmmi,
  updateSmmi,
  deleteSmmi,
};

export default SmmiServices;
