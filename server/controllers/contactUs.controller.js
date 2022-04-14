import ContactUsServices from "../services/contactUs.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get } from "lodash";

const _ = { get };

const listContactUs = async (req, res, next) => {
  ContactUsServices.listContactUs(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createContactUS = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  let formData = _.get(req, "body", {});

  ContactUsServices.createContactUs(formData)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const searchContactUs = async (req, res, next) => {
  const q = _.get(req, "params.q", "");
  const entityParams = _.get(req, "query", {});
  ContactUsServices.searchContactUs(q, entityParams)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const ContactUsController = {
  listContactUs,
  createContactUS,
  searchContactUs,
};

export default ContactUsController;
