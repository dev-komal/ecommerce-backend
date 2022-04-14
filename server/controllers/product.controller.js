import ProductServices from "../services/product.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get, result } from "lodash";

const _ = { get };

const listProducts = async (req, res, next) => {
  ProductServices.listProducts(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const listAllProducts = async (req, res, next) => {
  ProductServices.listAllProducts(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getProductDetail = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);
  const tokenUser = _.get(req, "tokenUser", {});

  ProductServices.getProductDetail(id, tokenUser)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createProduct = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  ProductServices.createProduct(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const updateProduct = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  const id = _.get(req, "params.id", 0);

  ProductServices.updateProduct(req, id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const deleteProduct = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);

  ProductServices.deleteProduct(id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const searchProduct = async (req, res, next) => {
  const q = _.get(req, "params.q", "");
  const entityParams = _.get(req, "query", {});

  ProductServices.searchProduct(q, entityParams)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const ProductController = {
  listProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  listAllProducts,
};

export default ProductController;
