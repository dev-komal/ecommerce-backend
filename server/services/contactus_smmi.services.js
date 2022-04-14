import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles } from "../common/appConstants";

const _ = { get, Empty, isNull };

// List ContactUs

const listContactus_smmi = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const Contactus_smmi = await Models.Contactus_smmi.findAndCountAll({
      attributes: ["id", "fullname", "email", "message"],
      include: [],
      offset: entityPagination.offset,
      limit: entityPagination.limit,
      order: [["createdAt", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((Contactus_smmi || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((Contactus_smmi || {}).rows || []).length || 0;
    pagination["count"] = (Contactus_smmi || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (Contactus_smmi || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// Create ContactUs

const createContactus_smmi = async (data) => {
  let response = statusConst.error;

  try {
    const Contactus_smmiPayload = {
      fullname: data.fullname || "",
      email: data.email || "",
      message: data.message || "",
    };

    // Create new Contactus_smmi entity
    const Contactus_smmi = await Models.Contactus_smmi.create(
      Contactus_smmiPayload,
      {
        raw: true,
      }
    );

    const Contactus_smmiId = _.get(Contactus_smmi, "id", 0);

    // Contactus_smmi not created, throw an exception
    if (!Contactus_smmiId) {
      return {
        ...statusConst.error,
        message: "Unable to send request",
      };
    }

    response = {
      ...statusConst.success,
      message: "Your request is send",
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

// Search ContactUs
const searchContactus_smmi = async (q, entityParams) => {
  let response = statusConst.error;
  try {
    const entityPagination = Helper.dataPagination(entityParams);

    // Search Contactus_smmi
    const Contactus_smmi = await Models.Contactus_smmi.findAndCountAll({
      attributes: ["id", "fullname", "email", "message"],
      include: [],
      where: {
        [Op.or]: {
          fullname: { [Op.like]: `%${q}%` },
          email: { [Op.like]: `%${q}%` },
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
      ((Contactus_smmi || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((Contactus_smmi || {}).rows || []).length || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (Contactus_smmi || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const Contactus_smmiServices = {
  listContactus_smmi,
  createContactus_smmi,
  searchContactus_smmi,
};

export default Contactus_smmiServices;
