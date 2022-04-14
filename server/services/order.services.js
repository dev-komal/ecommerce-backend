import statusConst from "../common/statusConstants";
import { Model, Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles } from "../common/appConstants";

const _ = { get, Empty, isNull };

// List Orders

const listOrders = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const orders = await Models.Order.findAndCountAll({
      attributes: [
        "id",
        "user_id",
        "order_address",
        "city",
        "landmark",
        "pincode",
        "status",
        "grand_total",
        "createdAt",
      ],
      include: [
        {
          model: Models.User,
          as: "User",
          attributes: [
            "profile_image",
            "first_name",
            "last_name",
            "address",
            "phone",
            "id",
          ],
        },
      ],

      offset: entityPagination.offset,
      limit: entityPagination.limit,
      // order: [["created_at", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((orders || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((orders || {}).rows || []).length || 0;
    pagination["count"] = (orders || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (orders || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// List All Orders
const listAllOrders = async (req) => {
  let response = statusConst.error;

  try {
    const orders = await Models.Order.findAll({
      attributes: [
        "id",
        "user_id",
        "order_address",
        "city",
        "landmark",
        "pincode",
        "status",
        "grand_total",
        "createdAt",
      ],
      include: [
        {
          model: Models.User,
          as: "User",
          attributes: [
            "profile_image",
            "first_name",
            "last_name",
            "address",
            "phone",
            "id",
          ],
        },
      ],
    });

    response = { ...statusConst.success, data: orders };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Get orders Details

const getOrderDetail = async (id, tokenUser) => {
  let response = statusConst.error;
  console.log("DATA--------------------");
  try {
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.id &&
      id != tokenUser.id
    ) {
      return { ...statusConst.forbidden };
    }

    const order = await Models.Order.findOne({
      attributes: [
        "id",
        "user_id",
        "order_address",
        "city",
        "landmark",
        "pincode",
        "status",
        "grand_total",
        "createdAt",
      ],
      include: [
        {
          model: Models.User,
          as: "User",
          attributes: [
            "profile_image",
            "first_name",
            "last_name",
            "address",
            "phone",
            "id",
          ],
        },
        {
          model: Models.OrderDetails,
          as: "OrderDetails",
          attributes: ["id", "product_id", "quantity"],

          include: [
            {
              model: Models.Product,
              as: "Product",
              attributes: ["id", "title", "product_image", "price"],
            },
          ],
        },
        // {
        //   model: Models.OrderDetails,
        //   as: "OrderDetailsProduct",
        //   attributes: ["id"],
        // },
      ],
      where: {
        [Op.and]: {
          id: id,
        },
      },
    });

    if (!order) {
      return { ...statusConst.error, message: "Order not found" };
    }

    response = { ...statusConst.success, data: order };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// Create order

const createOrder = async (data) => {
  let response = statusConst.error;

  try {
    const orderPayload = {
      user_id: data.user_id || "",
      order_address: data.order_address || "",
      city: data.city || "",
      landmark: data.landmark || "",
      pincode: data.pincode || "",
      grand_total: data.grand_total || "",
      status: data.status || "",
    };

    // Create new order entity
    const order = await Models.Order.create(orderPayload, {
      raw: true,
    });

    const orderId = _.get(order, "id", 0);

    // order not created, throw an exception
    if (!orderId) {
      return {
        ...statusConst.error,
        message: "Unable to create a new Order",
      };
    }

    response = {
      ...statusConst.success,
      message: "Order created successfully",
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

// Update order

const updateOrder = async (formData, id) => {
  let response = statusConst.error;
  try {
    // Check if order is authorised or not
    if (formData.user_role_id == userRoles.USER_ROLE.id && id != formData.id) {
      return { ...statusConst.forbidden };
    }

    //Check if order exist
    const isOrder = await Models.Order.findOne({
      where: { id: id },
    });

    if (!isOrder) {
      return { ...statusConst.notFound, message: "Order not found" };
    }

    const orderPayload = {
      user_id: formData.user_id || isOrder.user_id,
      order_address: formData.order_address || isOrder.order_address,
      city: formData.city || isOrder.city,
      landmark: formData.landmark || isOrder.landmark,
      pincode: formData.pincode || isOrder.pincode,
      grand_total: formData.grand_total || isOrder.grand_total,
      status: formData.status || isOrder.status,
      updatedAT: formData.updatedAt || isOrder.updatedAt,
    };

    await isOrder.update(orderPayload);

    response = {
      ...statusConst.success,
      message: "Order updated successfully",
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

// Delete order

const deleteOrder = async (id) => {
  let response = statusConst.error;
  try {
    // Check if order exist
    const isOrder = await Models.Order.findOne({
      where: { id: id },
    });

    if (!isOrder) {
      return { ...statusConst.error, message: "Order not found" };
    }

    // Delete Order
    const order = await Models.Order.destroy({
      where: { id: id },
    });

    // order not deleted? throw an exception
    if (order === 0) {
      return { ...statusConst.success, message: "order deleted Failed" };
    }

    response = {
      ...statusConst.success,
      message: "Order deleted Successfully",
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Search order
const searchOrder = async (q, entityParams) => {
  let response = statusConst.error;
  try {
    const entityPagination = Helper.dataPagination(entityParams);

    // Search order
    const order = await Models.Order.findAndCountAll({
      attributes: [
        "id",
        "user_id",
        "createdAt",
        "order_address",
        "city",
        "landmark",
        "pincode",
        "grand_total",
        "status",
      ],
      include: [
        {
          model: Models.User,
          as: "User",
          attributes: ["first_name", "last_name", "id"],
        },
      ],
      where: {
        [Op.or]: {
          id: { [Op.like]: `%${q}%` },
          grand_total: { [Op.like]: `%${q}%` },
          status: { [Op.like]: `%${q}%` },
          user_id: { [Op.like]: `%${q}%` },
        },
      },
      offset: entityPagination.offset,
      limit: entityPagination.limit,
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((order || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((order || {}).rows || []).length || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (order || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// List All id According user login
const getOrderID = async (req) => {
  let response = statusConst.error;
  let user_id = _.get(req, "user_id", 0);
  let id = _.get(req, "id", 0);

  try {
    const orders = await Models.Order.findAll({
      attributes: [
        "id",
        "user_id",
        "createdAt",
        "order_address",
        "city",
        "landmark",
        "pincode",
        "grand_total",
        "status",
      ],
      include: [
        {
          model: Models.User,
          as: "User",
          attributes: ["id"],
        },
      ],
      where: {
        [Op.and]: {
          "$User.id$": { [Op.like]: `%${user_id}%` },
          // id: { [Op.like]: `%${id}%` },
        },
      },
    });
    if (!orders) {
      return { ...statusConst.error, message: "Add to cart not found" };
    }

    response = { ...statusConst.success, data: orders };
  } catch (error) {
    console.log("ORDER ERROR ___________________________________", error);
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const OrderServices = {
  listOrders,
  listAllOrders,
  getOrderDetail,
  createOrder,
  updateOrder,
  deleteOrder,
  searchOrder,
  getOrderID,
};

export default OrderServices;
