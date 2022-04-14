import CategoryServices from "../services/category.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get, result } from "lodash";

const _ = { get };

const listCategorys = async (req, res, next) => {
  CategoryServices.listCategorys(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const listAllCategorys = async (req, res, next) => {
  CategoryServices.listAllCategorys(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getCategoryDetail = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);
  const tokenUser = _.get(req, "tokenUser", {});

  CategoryServices.getCategoryDetail(id, tokenUser)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createCategory = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  CategoryServices.createCategory(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const updateCategory = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  // const formData = _.get(req, "body", {});
  const id = _.get(req, "params.id", 0);
  // formData.user_role_id = _.get(req, "tokenUser.user_role_id", 0);
  // formData.id = _.get(req, "tokenUser.id", 0);

  CategoryServices.updateCategory(req, id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const deleteCategory = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);

  CategoryServices.deleteCategory(id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const searchCategory = async (req, res, next) => {
  const q = _.get(req, "params.q", "");
  const entityParams = _.get(req, "query", {});
  CategoryServices.searchCategory(q, entityParams)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const CategoryController = {
  listCategorys,
  getCategoryDetail,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategory,
  listAllCategorys,
};

export default CategoryController;
