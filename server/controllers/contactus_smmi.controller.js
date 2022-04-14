import Contactus_smmiServices from "../services/Contactus_smmi.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get } from "lodash";

const _ = { get };

const listContactus_smmi = async (req, res, next) => {
  Contactus_smmiServices.listContactus_smmi(req)
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

  Contactus_smmiServices.createContactus_smmi(formData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const searchContactus_smmi = async (req, res, next) => {
  const q = _.get(req, "params.q", "");
  const entityParams = _.get(req, "query", {});
  Contactus_smmiServices.searchContactus_smmi(q, entityParams)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const Contactus_smmiController = {
  listContactus_smmi,
  createContactus_smmi,
  searchContactus_smmi,
};

export default Contactus_smmiController;
