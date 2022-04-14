import ColorServices from "../services/color.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get } from "lodash";

const _ = { get };

const listColors = async (req, res, next) => {
  ColorServices.listColors(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const listAllColors = async (req, res, next) => {
  ColorServices.listAllColors(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getColorDetail = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);
  const tokenUser = _.get(req, "tokenUser", {});

  ColorServices.getColorDetail(id, tokenUser)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createColor = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  let formData = _.get(req, "body", {});

  ColorServices.createColor(formData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const updateColor = async (req, res, next) => {
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

  ColorServices.updateColor(formData, id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const deleteColor = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);

  ColorServices.deleteColor(id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const searchColor = async (req, res, next) => {
  const q = _.get(req, "params.q", "");
  const entityParams = _.get(req, "query", {});
  ColorServices.searchColor(q, entityParams)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const ColorController = {
  listColors,
  getColorDetail,
  createColor,
  updateColor,
  deleteColor,
  searchColor,
  listAllColors,
};

export default ColorController;
