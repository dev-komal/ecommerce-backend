import SmmiServices from "../services/Smmi.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get, result } from "lodash";

const _ = { get };

const listSmmis = async (req, res, next) => {
  SmmiServices.listSmmi(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const listAllSmmis = async (req, res, next) => {
  SmmiServices.listAllSmmi(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getSmmiDetail = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);
  const tokenUser = _.get(req, "tokenUser", {});

  SmmiServices.getSmmiDetail(id, tokenUser)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createSmmi = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  SmmiServices.createSmmi(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const updateSmmi = async (req, res, next) => {
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

  SmmiServices.updateSmmi(req, id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const deleteSmmi = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);

  SmmiServices.deleteSmmi(id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const SmmiController = {
  listSmmis,
  getSmmiDetail,
  createSmmi,
  updateSmmi,
  deleteSmmi,
  listAllSmmis,
};

export default SmmiController;
