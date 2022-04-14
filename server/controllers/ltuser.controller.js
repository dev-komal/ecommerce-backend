import Lt_userServices from "../services/lt_user.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import { get, result } from "lodash";

const _ = { get };

const getAllBanners = async (req, res, next) => {
  Lt_userServices.getAllBanners(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getAllProducts = async (req, res, next) => {
  Lt_userServices.getAllProducts(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getProductByID = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);

  Lt_userServices.getProductByID(id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getAllCategories = async (req, res, next) => {
  Lt_userServices.getAllCategories(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const postContactUs = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  let formData = _.get(req, "body", {});

  Lt_userServices.postContactUs(formData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const postUser = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  Lt_userServices.postUser(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getAllSmmis = async (req, res, next) => {
  Lt_userServices.listAllSmmi(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createContactus_smmi = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  let formData = _.get(req, "body", {});

  Lt_userServices.createContactus_smmi(formData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};
const Lt_userController = {
  getAllBanners,
  getAllProducts,
  getAllCategories,
  postContactUs,
  postUser,
  getProductByID,
  getAllSmmis,
  createContactus_smmi,
};

export default Lt_userController;
