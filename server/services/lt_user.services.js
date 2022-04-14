import statusConst from "../common/statusConstants";
import Models from "../models";
import Helper from "../common/helper";
import { userRoles, commonStatuses, USER_DIR } from "../common/appConstants";
import appConfig from "../common/appConfig";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { get, Empty, isNull } from "lodash";
const _ = { get, Empty, isNull };

// List All Banners
const getAllBanners = async (req) => {
  let response = statusConst.error;

  try {
    const banners = await Models.Banner.findAll({
      attributes: ["id", "banner_image", "banner_name"],

      order: [["createdAt", "DESC"]],
    });

    response = { ...statusConst.success, data: banners };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// List All Products
const getAllProducts = async (req) => {
  let response = statusConst.error;

  try {
    const products = await Models.Product.findAll({
      attributes: [
        "id",
        "title",
        "product_image",
        "description",
        "price",
        "length",
        "type",
        "quantity",
      ],
      include: [
        {
          model: Models.Category,
          as: "Category",
          attributes: ["category_name", "category_image", "id"],
        },
        {
          model: Models.Color,
          as: "Color",
          attributes: ["color_name", "id"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    response = {
      ...statusConst.success,
      data: products,
    };
  } catch (error) {
    response = {
      ...statusConst.error,
      message: error.message,
    };
  }
  return response;
};

// List All Categorys
const getAllCategories = async (req) => {
  let response = statusConst.error;

  try {
    const categorys = await Models.Category.findAll({
      attributes: ["id", "category_name", "description", "category_image"],

      order: [["createdAt", "DESC"]],
    });

    response = { ...statusConst.success, data: categorys };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Create ContactUs

const postContactUs = async (data) => {
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

// Add User
const postUser = async (req) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.profile_image;
    fileName = `user-${Date.now().toString()}.${
      (file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
    }`;
    filePath = `${USER_DIR}${fileName}`;

    // Move product image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error, message: msgConst.uploadFailed };
        fileName = "";
      }
    });
  }
  try {
    const userPayload = {
      first_name: _.get(data, "first_name", ""),
      last_name: _.get(data, "last_name", ""),
      email: _.get(data, "email", ""),
      password: await bcrypt.hash(data.password, appConfig.bcryptSaltRound),
      address: _.get(data, "address", ""),
      phone: _.get(data, "phone", ""),
      status: _.get(data, "status", ""),
      profile_image: fileName,
      status: commonStatuses.ACTIVE.id,
      user_role_id: data.user_role_id || userRoles.USER_ROLE.id,
    };

    // Create new User entity
    const user = await Models.User.create(userPayload, { raw: true });

    const userId = _.get(user, "id", 0);

    // User not created, throw an exception
    if (!userId) {
      return { ...statusConst.error, message: "Unable to create a new User" };
    }

    response = { ...statusConst.success, message: "User created successfully" };
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

const getProductByID = async (id) => {
  let response = statusConst.error;

  try {
    const product = await Models.Product.findOne({
      attributes: [
        "id",
        "title",
        "product_image",
        "description",
        "category_id",
        "price",
        "color_id",
        "length",
        "type",
        "quantity",
        "status",
      ],
      include: [
        {
          model: Models.Category,
          as: "Category",
          attributes: ["category_name", "id"],
        },
        {
          model: Models.Color,
          as: "Color",
          attributes: ["color_name", "id"],
        },
      ],
      where: {
        [Op.and]: {
          id: id,
        },
      },
    });

    if (!product) {
      return {
        ...statusConst.error,
        message: "Product not found",
      };
    }

    response = {
      ...statusConst.success,
      data: product,
    };
  } catch (error) {
    response = {
      ...statusConst.error,
      message: error.message,
    };
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

const Lt_userServices = {
  getAllBanners,
  getAllProducts,
  getAllCategories,
  postContactUs,
  postUser,
  getProductByID,
  listAllSmmi,
  createContactus_smmi,
};

export default Lt_userServices;
