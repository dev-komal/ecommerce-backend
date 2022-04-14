import OrderServices from "../services/order.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get, result } from "lodash";

const _ = { get };

const listOrders = async (req, res, next) => {
  OrderServices.listOrders(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const listAllOrders = async (req, res, next) => {
  OrderServices.listAllOrders(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getOrderDetail = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);
  const tokenUser = _.get(req, "tokenUser", {});

  OrderServices.getOrderDetail(id, tokenUser)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createOrder = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  let formData = _.get(req, "body", {});

  OrderServices.createOrder(formData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const updateOrder = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  const formData = _.get(req, "body", {});
  const id = _.get(req, "params.id", 0);
  formData.user_role_id = _.get(req, "tokenUser.user_role_id", 0);
  formData.id = _.get(req, "tokenUser.id", 0);

  OrderServices.updateOrder(formData, id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const deleteOrder = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);

  OrderServices.deleteOrder(id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const searchOrder = async (req, res, next) => {
  const q = _.get(req, "params.q", "");
  console.log("qq", q);
  const entityParams = _.get(req, "query", {});
  console.log("Search controller");
  OrderServices.searchOrder(q, entityParams)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getOrderID = async (req, res, next) => {
  console.log("ORDER ID------");
  let user_id = _.get(req, "query", {});
  OrderServices.getOrderID(user_id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const OrderController = {
  listOrders,
  getOrderDetail,
  createOrder,
  updateOrder,
  deleteOrder,
  searchOrder,
  listAllOrders,
  getOrderID,
};

export default OrderController;
