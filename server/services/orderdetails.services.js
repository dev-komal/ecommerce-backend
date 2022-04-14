import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles } from "../common/appConstants";

const _ = { get, Empty, isNull };

// List Orders

const listOrdersDetails = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const orderDetails = await Models.OrderDetails.findAndCountAll({
      attributes: ["id", "order_id", "product_id", "quantity", "createdAt"],
      include: [
        {
          model: Models.Order,
          as: "Order",
          attributes: ["id", "user_id", "order_address"],
        },
        {
          model: Models.Product,
          as: "Product",
          attributes: [
            "id",
            "title",
            "length",
            "price",
            "quantity",
            "type",
            "product_image",
          ],
        },
      ],

      offset: entityPagination.offset,
      limit: entityPagination.limit,
      // order: [["created_at", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((orderDetails || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((orderDetails || {}).rows || []).length || 0;
    pagination["count"] = (orderDetails || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (orderDetails || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// List All Orders
const listAllOrdersDetails = async (req) => {
  let response = statusConst.error;

  try {
    const orders = await Models.OrderDetails.findAll({
      attributes: ["id", "order_id", "product_id", "quantity", "createdAt"],
      include: [
        {
          model: Models.Order,
          as: "Order",
          attributes: ["id", "user_id", "order_address"],
        },
        {
          model: Models.Product,
          as: "Product",
          attributes: [
            "id",
            "title",
            "length",
            "price",
            "quantity",
            "type",
            "product_image",
          ],
        },
      ],

      // order: ["created_at", "DESC"],
    });

    response = { ...statusConst.success, data: orders };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const listAllOrdersIDDetails = async (order_id, tokenUser, req) => {
  let response = statusConst.error;

  try {
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.order_id &&
      order_id != tokenUser.order_id
    ) {
      return { ...statusConst.forbidden };
    }
    const entityParams = _.get(req, "query", {});
    const entityPagination = Helper.dataPagination(entityParams);
    const order = await Models.OrderDetails.findOne({
      attributes: ["id", "order_id", "product_id", "quantity", "createdAt"],
      include: [
        {
          model: Models.Order,
          as: "Order",
          attributes: ["id", "user_id", "order_address"],
        },
        {
          model: Models.Product,
          as: "Product",
          attributes: [
            "id",
            "title",
            "length",
            "price",
            "quantity",
            "type",
            "product_image",
          ],
        },
      ],
      offset: entityPagination.offset,
      limit: entityPagination.limit,
      where: {
        [Op.and]: {
          order_id: order_id,
        },
      },
    });

    if (!order) {
      return { ...statusConst.error, message: "Order By ID not found" };
    }

    response = { ...statusConst.success, data: order };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// Get orders Details

const getOrderDetail = async (id, tokenUser) => {
  let response = statusConst.error;

  try {
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.id &&
      id != tokenUser.id
    ) {
      return { ...statusConst.forbidden };
    }

    const order = await Models.OrderDetails.findOne({
      attributes: ["id", "order_id", "product_id", "quantity", "createdAt"],
      include: [
        {
          model: Models.Order,
          as: "Order",
          attributes: ["id", "user_id", "order_address"],
        },
        {
          model: Models.Product,
          as: "Product",
          attributes: [
            "id",
            "title",
            "length",
            "price",
            "quantity",
            "type",
            "product_image",
          ],
        },
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

const createOrderDetails = async (data) => {
  let response = statusConst.error;

  try {
    const orderPayload = {
      order_id: data.order_id || "",
      product_id: data.product_id || "",
      quantity: data.quantity || "",
    };

    // Create new order entity
    const order = await Models.OrderDetails.create(orderPayload, {
      raw: true,
    });

    const orderId = _.get(order, "id", 0);

    // order not created, throw an exception
    if (!orderId) {
      return {
        ...statusConst.error,
        message: "Unable to create a new Order Details",
      };
    }

    response = {
      ...statusConst.success,
      message: "Order Details created successfully",
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

const updateOrderDetails = async (formData, id) => {
  let response = statusConst.error;
  try {
    // Check if order is authorised or not
    if (formData.user_role_id == userRoles.USER_ROLE.id && id != formData.id) {
      return { ...statusConst.forbidden };
    }

    //Check if order exist
    const isOrder = await Models.OrderDetails.findOne({
      where: { id: id },
    });

    if (!isOrder) {
      return { ...statusConst.notFound, message: "Order not found" };
    }

    const orderPayload = {
      order_id: formData.order_id || isOrder.order_id,
      product_id: formData.product_id || isOrder.product_id,
      quantity: formData.quantity || isOrder.quantity,
    };

    await isOrder.update(orderPayload);

    response = {
      ...statusConst.success,
      message: "Order Details updated successfully",
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

const deleteOrderDetails = async (id) => {
  let response = statusConst.error;
  try {
    // Check if order exist
    const isOrder = await Models.OrderDetails.findOne({
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
const searchOrderDetails = async (q, entityParams) => {
  let response = statusConst.error;
  try {
    const entityPagination = Helper.dataPagination(entityParams);

    // Search order
    const order = await Models.OrderDetails.findAndCountAll({
      attributes: ["id", "order_id", "product_id", "quantity", "createdAt"],
      include: [
        {
          model: Models.Order,
          as: "Order",
          attributes: ["id", "user_id", "order_address"],
        },
        {
          model: Models.Product,
          as: "Product",
          attributes: [
            "id",
            "title",
            "length",
            "price",
            "quantity",
            "type",
            "product_image",
          ],
        },
      ],
      where: {
        [Op.or]: {
          order_id: { [Op.like]: `%${q}%` },
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

const OrderDetailsServices = {
  listOrdersDetails,
  listAllOrdersDetails,
  getOrderDetail,
  createOrderDetails,
  updateOrderDetails,
  deleteOrderDetails,
  searchOrderDetails,
  listAllOrdersIDDetails,
};

export default OrderDetailsServices;
