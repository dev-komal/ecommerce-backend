import AddToCartServices from "../services/add-to-cart.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get } from "lodash";

const _ = { get };

const listAddToCart = async (req, res, next) => {
  AddToCartServices.listAddToCart(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const listAllAddToCart = async (req, res, next) => {
  AddToCartServices.listAllAddToCart(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getAddToCartDetail = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);
  const tokenUser = _.get(req, "tokenUser", {});

  AddToCartServices.getAddToCartDetail(id, tokenUser)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createAddToCart = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  let formData = _.get(req, "body", {});

  AddToCartServices.createAddToCart(formData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const updateAddToCart = async (req, res, next) => {
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

  AddToCartServices.updateAddToCart(formData, id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const deleteAddToCart = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);

  AddToCartServices.deleteAddToCart(id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getAddToCartByUserID = async (req, res, next) => {
  let user_id = _.get(req, "query", {});
  AddToCartServices.getAddToCartByUserID(user_id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const AddToCartController = {
  listAddToCart,
  getAddToCartDetail,
  createAddToCart,
  updateAddToCart,
  deleteAddToCart,
  listAllAddToCart,
  getAddToCartByUserID,
};

export default AddToCartController;
