import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles } from "../common/appConstants";

const _ = { get, Empty, isNull };

// List ContactUs

const listContactUs = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const contactUs = await Models.ContactUs.findAndCountAll({
      attributes: ["id", "fullname", "email", "message"],
      include: [],
      offset: entityPagination.offset,
      limit: entityPagination.limit,
      order: [["createdAt", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((contactUs || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((contactUs || {}).rows || []).length || 0;
    pagination["count"] = (contactUs || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (contactUs || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// Create ContactUs

const createContactUs = async (data) => {
  let response = statusConst.error;

  try {
    const contactUsPayload = {
      fullname: data.fullname || "",
      email: data.email || "",
      message: data.message || "",
    };

    // Create new ContactUs entity
    const contactUs = await Models.ContactUs.create(contactUsPayload, {
      raw: true,
    });

    const contactUsId = _.get(contactUs, "id", 0);

    // contactUs not created, throw an exception
    if (!contactUsId) {
      return {
        ...statusConst.error,
        message: "Unable to create a new contactUs",
      };
    }

    response = {
      ...statusConst.success,
      message: "contactUs created successfully",
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
const searchContactUs = async (q, entityParams) => {
  let response = statusConst.error;
  try {
    const entityPagination = Helper.dataPagination(entityParams);

    // Search contactUs
    const contactUs = await Models.ContactUs.findAndCountAll({
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
      ((contactUs || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((contactUs || {}).rows || []).length || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (contactUs || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const ContactUsServices = {
  listContactUs,
  createContactUs,
  searchContactUs,
};

export default ContactUsServices;
