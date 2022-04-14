import { validationResult } from "express-validator";
import AuthServices from "../services/auth.services";
import statusConstants from "../common/statusConstants";
import Validator from "../validators/index";
import { get } from "lodash";

const _ = { get };

const login = (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = {
      ...statusConstants.validationErrors,
      errors: formatted,
    };
    return res.status(responseData.status).send(responseData);
  }

  const bodyData = _.get(req, "body", {});

  AuthServices.login(bodyData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const verifyCode = (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = {
      ...statusConstants.validationErrors,
      errors: formatted,
    };
    return res.status(responseData.status).send(responseData);
  }

  const bodyData = _.get(req, "body", {});

  AuthServices.verifyCode(bodyData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const resendCode = (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = {
      ...statusConstants.validationErrors,
      errors: formatted,
    };
    return res.status(responseData.status).send(responseData);
  }

  const bodyData = _.get(req, "body", {});

  AuthServices.resendCode(bodyData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const changePassword = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());
    const responseData = { ...statusConstants.error, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  let bodyData = _.get(req, "body", {});
  bodyData["id"] = bodyData.id ? bodyData.id : _.get(req, "tokenUser.id", {});

  AuthServices.changePassword(bodyData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const AuthController = {
  login,
  changePassword,
  verifyCode,
  resendCode,
};

export default AuthController;
