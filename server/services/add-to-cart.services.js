import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles } from "../common/appConstants";

const _ = { get, Empty, isNull };

// List Addtocart

const listAddToCart = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const addtocart = await Models.AddToCart.findAndCountAll({
      attributes: ["id", "user_id", "product_id", "quantity", "price", "total"],
      include: [],
      offset: entityPagination.offset,
      limit: entityPagination.limit,
      order: [["createdAt", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((addtocart || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((addtocart || {}).rows || []).length || 0;
    pagination["count"] = (addtocart || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (addtocart || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// List All Addtocart
const listAllAddToCart = async (req) => {
  let response = statusConst.error;

  try {
    const addtocart = await Models.AddToCart.findAll({
      attributes: ["id", "user_id", "product_id", "quantity", "price", "total"],
      order: [["createdAt", "DESC"]],
    });

    response = { ...statusConst.success, data: addtocart };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Get Addtocart Details

const getAddToCartDetail = async (id, tokenUser) => {
  let response = statusConst.error;

  try {
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.id &&
      id != tokenUser.id
    ) {
      return { ...statusConst.forbidden };
    }

    const addtocart = await Models.AddToCart.findOne({
      attributes: ["id", "user_id", "product_id", "quantity", "price", "total"],
      where: {
        [Op.and]: {
          id: id,
        },
      },
    });

    if (!addtocart) {
      return { ...statusConst.error, message: "AddToCart By ID not found" };
    }

    response = { ...statusConst.success, data: addtocart };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// Create addtocart

const createAddToCart = async (data) => {
  let response = statusConst.error;

  try {
    const addtocartPayload = {
      user_id: _.get(data, "user_id", {}),
      product_id: _.get(data, "product_id", {}),
      quantity: _.get(data, "quantity", {}),
      price: _.get(data, "price", {}),
      total: _.get(data, "quantity", {}) * _.get(data, "price", {}),
    };

    // Create new Addtocart entity
    const addtocart = await Models.AddToCart.create(addtocartPayload, {
      raw: true,
    });

    const addtocartId = _.get(addtocart, "id", 0);

    // addtocart not created, throw an exception
    if (!addtocartId) {
      return {
        ...statusConst.error,
        message: "Unable to create a new addtocart",
      };
    }

    response = {
      ...statusConst.success,
      message: "addtocart created successfully",
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

// Update AddToCart

const updateAddToCart = async (formData, id) => {
  let response = statusConst.error;
  try {
    // Check if AddToCart is authorised or not
    if (formData.user_role_id == userRoles.USER_ROLE.id && id != formData.id) {
      return { ...statusConst.forbidden };
    }

    //Check if AddToCart exist
    const isAddToCart = await Models.AddToCart.findOne({
      where: { id: id },
    });

    if (!isAddToCart) {
      return { ...statusConst.notFound, message: "AddToCart not found" };
    }

    const addtocartPayload = {
      user_id: formData.user_id || isAddToCart.user_id,
      product_id: formData.product_id || isAddToCart.product_id,
      quantity: formData.quantity || isAddToCart.quantity,
      price: formData.price || isAddToCart.price,
      total: formData.quantity * formData.price || isAddToCart.total,
    };

    await isAddToCart.update(addtocartPayload);

    response = {
      ...statusConst.success,
      message: "Add to Cart updated successfully",
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

// Delete AddToCart

const deleteAddToCart = async (id) => {
  let response = statusConst.error;
  try {
    // Check if AddToCart exist
    const isAddToCart = await Models.AddToCart.findOne({
      where: { id: id },
    });

    if (!isAddToCart) {
      return { ...statusConst.error, message: "AddToCart not found" };
    }

    // Delete AddToCart
    const addtocart = await Models.AddToCart.destroy({
      where: { id: id },
    });

    // addtocart not deleted? throw an exception
    if (addtocart === 0) {
      return { ...statusConst.success, message: "AddToCart deleted Failed" };
    }

    response = {
      ...statusConst.success,
      message: "AddToCart deleted Successfully",
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Get Addtocart By USER ID

const getAddToCartByUserID = async (req) => {
  let response = statusConst.error;
  let user_id = _.get(req, "user_id", 0);

  try {
    const addtocart = await Models.AddToCart.findAndCountAll({
      attributes: ["id", "user_id", "product_id", "quantity", "price", "total"],
      include: [
        {
          model: Models.User,
          as: "User",
          attributes: ["id"],
        },
        {
          model: Models.Product,
          as: "Product",
          attributes: [
            "id",
            "title",
            "description",
            "length",
            "type",
            "quantity",
            "product_image",
            "price",
          ],
        },
      ],
      where: {
        [Op.and]: {
          "$User.id$": { [Op.like]: `%${user_id}%` },
        },
      },
    });

    if (!addtocart) {
      return { ...statusConst.error, message: "Add to cart not found" };
    }

    response = { ...statusConst.success, data: addtocart };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};
const AddToCartServices = {
  listAddToCart,
  listAllAddToCart,
  getAddToCartDetail,
  createAddToCart,
  updateAddToCart,
  deleteAddToCart,
  getAddToCartByUserID,
};

export default AddToCartServices;
