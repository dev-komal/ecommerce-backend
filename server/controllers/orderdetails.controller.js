import OrderDetailsServices from "../services/orderdetails.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get, result } from "lodash";

const _ = { get };

const listOrdersDetails = async (req, res, next) => {
  OrderDetailsServices.listOrdersDetails(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const listAllOrdersDetails = async (req, res, next) => {
  OrderDetailsServices.listAllOrdersDetails(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const listAllOrdersIDDetails = async (req, res, next) => {
  const order_id = _.get(req, "params.order_id", 0);
  const tokenUser = _.get(req, "tokenUser", {});

  OrderDetailsServices.listAllOrdersIDDetails(order_id, tokenUser)
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

  OrderDetailsServices.getOrderDetail(id, tokenUser)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createOrderDetails = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  let formData = _.get(req, "body", {});

  OrderDetailsServices.createOrderDetails(formData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const updateOrderDetails = async (req, res, next) => {
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

  OrderDetailsServices.updateOrderDetails(formData, id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const deleteOrderDetails = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);

  OrderDetailsServices.deleteOrderDetails(id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const searchOrderDetails = async (req, res, next) => {
  const q = _.get(req, "params.q", "");
  console.log("qq", q);
  const entityParams = _.get(req, "query", {});
  console.log("Search controller");
  OrderDetailsServices.searchOrderDetails(q, entityParams)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const OrderDetailsController = {
  listOrdersDetails,
  getOrderDetail,
  createOrderDetails,
  updateOrderDetails,
  deleteOrderDetails,
  searchOrderDetails,
  listAllOrdersDetails,
  listAllOrdersIDDetails,
};

export default OrderDetailsController;
